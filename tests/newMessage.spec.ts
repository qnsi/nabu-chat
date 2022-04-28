import {test, expect} from "@playwright/test"

test("adding a message works", async ({ page }) => {
  await page.goto("http://localhost:3000/")

  await page.fill(".chat-text-field", "Hello world!");
  await page.click("text=Send")

  const chat_message = page.locator(".chat-message:has-text('Hello world!')")
  await expect(chat_message).toHaveText("Qnsi: Hello world!")

  await page.reload()
  const chat_message_new = page.locator(".chat-message:has-text('Hello world!')")
  await expect(chat_message_new).toHaveText("Qnsi: Hello world!")
  // should work after refresh
});

test("adding with no internet should ask to retry", async({page}) => {
  await page.route("http://localhost:3001", route => route.abort());
  await page.goto("http://localhost:3000/")

  await page.fill(".chat-text-field", "Hello world!");
  await page.click("text=Send")
  const chat_message = page.locator(".chat-message:has-text('Hello world!')")
  await expect(chat_message).toHaveText("Qnsi: Hello world!Something went wrong. Retry?")
  await expect(chat_message).toHaveClass("chat-message error")
  const chat_message_retry = page.locator(".chat-message:has-text('Hello world!') >> button")
  await expect(chat_message_retry).toHaveText("Something went wrong. Retry?")
})