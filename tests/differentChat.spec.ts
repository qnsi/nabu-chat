import {test, expect} from "@playwright/test"
import { sendMessage } from "./testHelpers.spec";

test("moving between chats work", async ({ page }) => {
  await page.goto("http://localhost:3001/dangerous/only_in_dev/clear_database")
  await page.goto("http://localhost:3000/")
  await sendMessage(page, "Hello world!")

  await page.click(".channel:has-text('random')")
  const chat_message = page.locator(".chat-message:has-text('Hello world!')")
  await expect(await chat_message.isVisible()).toBe(false)
  await sendMessage(page, "This is random")
  
  await page.click(".channel:has-text('main')")
  const chat_message_new = page.locator(".chat-message:has-text('Hello world!')")
  await expect(chat_message_new).toHaveText("Qnsi: Hello world!")
});