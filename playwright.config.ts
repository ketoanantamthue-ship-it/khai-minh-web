import { existsSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright và axe (docs/08). Chạy sau `npm run build`:
 * máy chủ thử là bản production (`next start`) ở cổng 3100.
 */
const PORT = Number(process.env.PORT_THU ?? 3100);

// Trong môi trường Claude Code trên web, Chromium có sẵn ở /opt/pw-browsers.
// Trong CI, Chromium được cài bằng `npx playwright install`.
const chromiumCoSan = "/opt/pw-browsers/chromium";
const executablePath = !process.env.CI && existsSync(chromiumCoSan) ? chromiumCoSan : undefined;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    locale: "vi-VN",
    trace: "retain-on-failure",
    launchOptions: executablePath ? { executablePath } : {},
  },
  projects: [
    { name: "dien-thoai-390", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 } } },
    { name: "may-tinh-1366", use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 768 } } },
  ],
  webServer: {
    command: `npm run start -- --port ${PORT}`,
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
