/**
 * Nơi nhận thư của web Khai Minh (phiên S5; docs/07, mục A5).
 *
 * Mã này chạy trên Google Apps Script, gắn với một bảng tính Google Sheets
 * của tài khoản khaivannguoi@gmail.com. Cách dán và triển khai: xem
 * apps-script/HUONG-DAN.md.
 *
 * Web (app/api/thu/route.ts) gửi sang đây một gói JSON đã kiểm. Mã này:
 *  1. kiểm mã bí mật dùng chung (Thuộc tính tập lệnh BI_MAT, do hàm caiDat tạo);
 *  2. đếm tần suất theo khoá băm của địa chỉ mạng, và đếm chung cả web;
 *  3. lá thư: ghi một dòng vào trang “Thư”, gửi thông báo về hộp thư của
 *     Khai Minh, gửi thư xác nhận cho khách nếu khách để lại địa chỉ thư;
 *  4. ô nhận thư: ghi một dòng vào trang “Danh sách nhận thư” (bỏ qua nếu
 *     địa chỉ ấy đã có trong cùng danh sách).
 *
 * Không ghi nội dung thư vào nhật ký (Logger, console).
 */

/** Hộp thư nhận thông báo khi có lá thư mới. */
var HOP_THU_KHAI_MINH = 'khaivannguoi@gmail.com';
/** Tên người gửi hiện trong hộp thư của khách. */
var TEN_NGUOI_GUI = 'Khai Minh';

var TRANG_THU = 'Thư';
var COT_THU = ['Thời gian', 'Chủ đề', 'Tên gọi', 'Câu hỏi', 'Địa chỉ thư', 'Đã đồng ý'];
var TRANG_NHAN_THU = 'Danh sách nhận thư';
var COT_NHAN_THU = ['Thời gian', 'Danh sách', 'Địa chỉ thư', 'Đã đồng ý'];
var TEN_DANH_SACH = { thang: 'Nhận thư hằng tháng', sach: 'Báo cho tôi khi sách ra đời' };

/** Mỗi địa chỉ mạng gửi tối đa 5 lần trong 10 phút; cả web tối đa 60 lần mỗi giờ. */
var GIOI_HAN_MOI_NGUOI = 5;
var GIOI_HAN_CA_WEB = 60;

/**
 * Thư xác nhận gửi cho khách (chữ cho khách: CLAUDE.md, quy tắc 1).
 * Thư không chép lại câu hỏi hay tên gọi, để nếu ai đó điền nhầm địa chỉ của
 * người khác, người ấy không nhận được chữ lạ nào.
 */
var THU_XAC_NHAN = {
  tieuDe: 'Tôi đã nhận được lá thư của bạn',
  than: [
    'Chào bạn,',
    '',
    'Tôi đã nhận được lá thư của bạn. Cảm ơn bạn đã tin mà gửi cho tôi.',
    'Tôi sẽ đọc kỹ và hồi âm bạn trong ngày, qua chính địa chỉ thư này.',
    '',
    'Lá thư vẫn là của bạn. Nếu muốn xem lại, sửa hay xóa lá thư, bạn chỉ cần trả lời thư này.',
    '',
    'Nếu bạn đang gặp nguy hiểm, xin đừng chờ thư hồi âm. Bạn hãy gọi cấp cứu 115.',
    '',
    'Nếu bạn chưa từng viết thư cho tôi, có lẽ ai đó đã ghi nhầm địa chỉ của bạn. Bạn cứ bỏ qua thư này, tôi sẽ không gửi thêm.',
    '',
    'Người Khai Vấn (Khai Minh)',
  ].join('\n'),
};

/* ------------------------------------------------------------------ */

/** Web gửi thư tới đây. */
function doPost(e) {
  var goi;
  try {
    goi = JSON.parse((e && e.postData && e.postData.contents) || '');
  } catch (loi) {
    return traLoi_({ ok: false, loi: 'du-lieu' });
  }

  var biMat = PropertiesService.getScriptProperties().getProperty('BI_MAT');
  if (!biMat || !goi || typeof goi.biMat !== 'string' || !bangNhau_(goi.biMat, biMat)) {
    return traLoi_({ ok: false, loi: 'bi-mat' });
  }

  if (!duocGui_(String(goi.khoa || 'khong-ro'))) {
    return traLoi_({ ok: false, loi: 'nhieu' });
  }

  var khoa = LockService.getScriptLock();
  try {
    khoa.waitLock(15000);
  } catch (loi) {
    return traLoi_({ ok: false, loi: 'ban' });
  }
  try {
    if (goi.loai === 'hoi') {
      nhanLaThu_(goi);
    } else if (goi.loai === 'thang' || goi.loai === 'sach') {
      nhanDiaChi_(goi);
    } else {
      return traLoi_({ ok: false, loi: 'du-lieu' });
    }
  } catch (loi) {
    // Chỉ ghi tên lỗi, không ghi gì của lá thư.
    console.error('Không ghi được thư: ' + (loi && loi.name));
    return traLoi_({ ok: false, loi: 'ghi' });
  } finally {
    khoa.releaseLock();
  }
  return traLoi_({ ok: true });
}

/** Mở địa chỉ web của tập lệnh trên trình duyệt để xem nó còn chạy. */
function doGet() {
  return ContentService.createTextOutput('Nơi nhận thư của web Khai Minh đang chạy.');
}

/* ------------------------------------------------------------------ */

function nhanLaThu_(goi) {
  var email = laDiaChiThu_(goi.email) ? String(goi.email) : '';
  var bayGio = new Date();
  layTrang_(TRANG_THU, COT_THU).appendRow([
    bayGio,
    o_(goi.chuDe),
    o_(goi.ten),
    o_(goi.cauHoi),
    o_(email),
    goi.dongY === true ? 'Có' : 'Không',
  ]);

  // Thông báo cho Khai Minh. Bấm “Trả lời” là trả lời thẳng cho khách.
  var thongBao = {
    to: HOP_THU_KHAI_MINH,
    subject: '[Lá thư mới] ' + catNgan_(goi.chuDe, 80),
    body: [
      'Có một lá thư mới gửi từ web.',
      '',
      'Thời gian: ' + Utilities.formatDate(bayGio, 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm'),
      'Chủ đề: ' + String(goi.chuDe || ''),
      'Tên gọi: ' + (String(goi.ten || '') || '(không ghi)'),
      'Địa chỉ thư: ' + (email || '(không để lại)'),
      '',
      'Câu hỏi:',
      String(goi.cauHoi || ''),
      '',
      'Lá thư cũng đã được ghi vào trang “' + TRANG_THU + '” của bảng tính.',
    ].join('\n'),
    name: 'Web Khai Minh',
  };
  if (email) thongBao.replyTo = email;
  guiThu_(thongBao);

  if (email) {
    guiThu_({ to: email, subject: THU_XAC_NHAN.tieuDe, body: THU_XAC_NHAN.than, name: TEN_NGUOI_GUI });
  }
}

function nhanDiaChi_(goi) {
  if (!laDiaChiThu_(goi.email)) throw new Error('Địa chỉ thư không hợp lệ');
  var email = String(goi.email).toLowerCase();
  var danhSach = TEN_DANH_SACH[goi.loai];
  var trang = layTrang_(TRANG_NHAN_THU, COT_NHAN_THU);

  // Địa chỉ đã có trong cùng danh sách thì không ghi thêm dòng.
  var soDong = trang.getLastRow();
  if (soDong > 1) {
    var cu = trang.getRange(2, 2, soDong - 1, 2).getValues();
    for (var i = 0; i < cu.length; i++) {
      if (cu[i][0] === danhSach && String(cu[i][1]).replace(/^'/, '').toLowerCase() === email) return;
    }
  }
  trang.appendRow([new Date(), danhSach, o_(email), goi.dongY === true ? 'Có' : 'Không']);
}

/* ------------------------------------------------------------------ */

/** Lấy trang theo tên; chưa có thì tạo, kèm dòng tiêu đề. */
function layTrang_(ten, cot) {
  var bang = SpreadsheetApp.getActiveSpreadsheet();
  var trang = bang.getSheetByName(ten);
  if (!trang) {
    trang = bang.insertSheet(ten);
    trang.appendRow(cot);
    trang.setFrozenRows(1);
    trang.getRange(1, 1, 1, cot.length).setFontWeight('bold');
  }
  return trang;
}

/**
 * Chữ khách gõ, đưa vào ô bảng tính. Ô bắt đầu bằng = + - @ sẽ bị bảng tính
 * hiểu là công thức, nên thêm dấu ' ở đầu để giữ nguyên là chữ.
 */
function o_(giaTri) {
  var s = String(giaTri == null ? '' : giaTri).slice(0, 6000);
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}

function catNgan_(s, n) {
  s = String(s || '').replace(/[\r\n]+/g, ' ');
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

function laDiaChiThu_(s) {
  return typeof s === 'string' && s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

/** Gửi thư khi còn hạn mức trong ngày (Gmail thường: 100 người nhận mỗi ngày). */
function guiThu_(thu) {
  if (MailApp.getRemainingDailyQuota() < 1) {
    console.warn('Đã hết hạn mức gửi thư trong ngày; lá thư vẫn được ghi vào bảng tính.');
    return;
  }
  MailApp.sendEmail(thu);
}

/** Đếm tần suất bằng bộ nhớ đệm của Apps Script. */
function duocGui_(khoa) {
  var dem = CacheService.getScriptCache();
  var gio = 'tong:' + Math.floor(Date.now() / 3600000);
  var nguoi = 'nguoi:' + khoa.slice(0, 64);
  var soGio = Number(dem.get(gio) || 0);
  var soNguoi = Number(dem.get(nguoi) || 0);
  if (soGio >= GIOI_HAN_CA_WEB || soNguoi >= GIOI_HAN_MOI_NGUOI) return false;
  dem.put(gio, String(soGio + 1), 3600);
  dem.put(nguoi, String(soNguoi + 1), 600);
  return true;
}

/** So hai chuỗi mà không dừng sớm ở ký tự khác đầu tiên. */
function bangNhau_(a, b) {
  if (a.length !== b.length) return false;
  var khac = 0;
  for (var i = 0; i < a.length; i++) khac |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return khac === 0;
}

function traLoi_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ------------------------------------------------------------------ */
/* Hai hàm dưới đây anh chạy tay trong trình soạn Apps Script.         */

/**
 * Chạy một lần sau khi dán mã: tạo hai trang “Thư” và “Danh sách nhận thư”,
 * đặt múi giờ Việt Nam, xin quyền ghi bảng tính và gửi thư, và tạo mã bí mật
 * BI_MAT nếu chưa có. Mã bí mật hiện trong Nhật ký thực thi để anh chép sang
 * Vercel (biến THU_BI_MAT). Chạy lại lần nữa không tạo mã mới.
 */
function caiDat() {
  var bang = SpreadsheetApp.getActiveSpreadsheet();
  bang.setSpreadsheetTimeZone('Asia/Ho_Chi_Minh');
  layTrang_(TRANG_THU, COT_THU);
  layTrang_(TRANG_NHAN_THU, COT_NHAN_THU);

  var thuocTinh = PropertiesService.getScriptProperties();
  var biMat = thuocTinh.getProperty('BI_MAT');
  if (!biMat) {
    biMat = (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, '');
    thuocTinh.setProperty('BI_MAT', biMat);
  }
  console.log('Đã tạo hai trang “' + TRANG_THU + '” và “' + TRANG_NHAN_THU + '”.');
  console.log('Hạn mức gửi thư còn lại hôm nay: ' + MailApp.getRemainingDailyQuota() + '.');
  console.log('Mã BI_MAT (chép sang Vercel, biến THU_BI_MAT): ' + biMat);
}

/**
 * Gửi thử thư xác nhận về chính hộp thư Khai Minh, để xem thư trông thế nào.
 * Không ghi gì vào bảng tính.
 */
function guiThuThu() {
  MailApp.sendEmail({
    to: HOP_THU_KHAI_MINH,
    subject: '[Thử] ' + THU_XAC_NHAN.tieuDe,
    body: THU_XAC_NHAN.than,
    name: TEN_NGUOI_GUI,
  });
  console.log('Đã gửi thư thử về ' + HOP_THU_KHAI_MINH + '.');
}
