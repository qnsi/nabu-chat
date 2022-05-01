import {Page} from "@playwright/test"

export async function sendMessage(page: Page, message: string) {
  await page.fill(".chat-text-field", message);
  await page.click("text=Send")
}