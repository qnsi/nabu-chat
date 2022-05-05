import { test, expect } from "@playwright/test";
import { sendMessage, switchToChannel } from "../testHelpers";

test("when other user sends message we should get it pushed", async ({ page, context }) => {
  await page.goto("http://localhost:3001/dangerous/only_in_dev/clear_database")
  await page.goto("http://localhost:3000/")
  const second_page = await context.newPage();
  await second_page.goto("http://localhost:3000/")
  await switchToChannel(second_page, "random")
  await sendMessage(second_page, "Hello world!")

  // badge should be visible
  await page.waitForTimeout(1100)
  const unread_badge = page.locator(".channel-parent:has-text('random') > .channel-unread")
  await expect(await unread_badge.isVisible()).toBe(true)
  await expect(unread_badge).toHaveText("1")

  // moving to channel should clear the badge
  await switchToChannel(page, "random")
  const unread_badge2 = page.locator(".channel-parent:has-text('random') > .channel-unread")
  await expect(await unread_badge2.isVisible()).toBe(false)
});
