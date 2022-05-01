import {test, expect} from "@playwright/test"

test("has correct layout", async ({ page }) => {
  await page.goto("http://localhost:3001/dangerous/only_in_dev/clear_database")
  await page.goto("http://localhost:3000/")

  const navbar = page.locator(".navigation");
  await expect(navbar).toHaveText("Nabu")
  
  const left_panel = page.locator(".left-panel");
  await expect(left_panel).toHaveText("mainrandom")

  const chat_text_field = page.locator(".chat-message-form")
  await expect(chat_text_field).toBeVisible()
})

