import {test, expect} from "@playwright/test"
import { sendMessage, switchToChannel } from "./testHelpers.spec";

test("when other user sends message we should get it pushed", async ({ page, context }) => {
  await page.goto("http://localhost:3001/dangerous/only_in_dev/clear_database")
  await page.goto("http://localhost:3000/")
  const second_page = await context.newPage();
  await second_page.goto("http://localhost:3000/")
  await sendMessage(page, "Hello world!")

  await second_page.waitForTimeout(1100)
  const chat_message = second_page.locator(".chat-message:has-text('Hello world!')")
  await expect(await chat_message.isVisible()).toBe(true)
  await expect(chat_message).toHaveText("Qnsi: Hello world!")
});

test("message sent from another user to different channel should go to correct channel", async ({ page, context}) => {
      await page.goto("http://localhost:3001/dangerous/only_in_dev/clear_database")
      await page.goto("http://localhost:3000/")
      const second_page = await context.newPage();
      await second_page.goto("http://localhost:3000/")
      await switchToChannel(second_page, "random")
      await sendMessage(page, "Hello world!")
      await second_page.waitForTimeout(1100)
      const chat_message = second_page.locator(".chat-message:has-text('Hello world!')")
      await expect(await chat_message.isVisible()).toBe(false)
})