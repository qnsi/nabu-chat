import {test, expect} from "@playwright/test"
import { sendMessage } from "../testHelpers";

test("search for main channel and click should show main messages", async ({ page }) => {
  await page.goto("http://localhost:3001/dangerous/only_in_dev/clear_database")
  await page.goto("http://localhost:3000/")
  await sendMessage(page, "Hello world!")

  await page.click(".channel:has-text('random')")
  // should find search bar
  await page.fill(".search-bar", "main");

  // should show suggestions
  const suggestions_dropdown = page.locator(".search-suggestions")
  await expect(await suggestions_dropdown.isVisible()).toBe(true)

  // clicking should move to main channel
  await page.click(".search-suggestion:has-text('main')")
  const chat_message = page.locator(".chat-message:has-text('Hello world!')")
  await expect(chat_message).toHaveText("Qnsi: Hello world!")
});