import {Page} from "@playwright/test"

export async function sendMessage(page: Page, message: string) {
  await page.fill(".chat-text-field", message);
  await page.click("text=Send")
}

export async function switchToChannel(page: Page, channelName: string) {
  await page.click(`.channel:has-text('${channelName}')`)
}