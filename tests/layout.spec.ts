import {test, expect} from "@playwright/test"

test("has correct layout", async ({ page }) => {
  await page.goto("http://localhost:3000/")

  const navbar = page.locator(".navigation");
  await expect(navbar).toHaveText("Nabu")
  
  const left_panel = page.locator(".left-panel");
  await expect(left_panel).toHaveText("#main")

  const chat_message = page.locator(".chat-message:has-text('Welcome')")
  await expect(chat_message).toHaveText("Qnsi: Welcome to our #main channel")

  const chat_text_field = page.locator(".chat-message-form")
  await expect(chat_text_field).toBeVisible()
})

