import {test, expect} from "@playwright/test"
import { sendMessage } from "../testHelpers";

test("getMessages API with wrong request", async ({ request }) => {
  await request.get("http://localhost:3001/dangerous/only_in_dev/clear_database")
  const messages = await request.get("http://localhost:3001/messages")
  expect(await messages.json()).toEqual({
    status: "error",
    errors: ["channelId_empty"]
  })
});

test("getMessages API with good request", async ({ request }) => {
  await request.get("http://localhost:3001/dangerous/only_in_dev/clear_database")
  const messages = await request.get("http://localhost:3001/messages?channelId=1")
  expect(await messages.json()).toEqual({
    messages: [],
    status: "ok"
  })
});

test("createMessage API with good request", async ({ request }) => {
  await request.get("http://localhost:3001/dangerous/only_in_dev/clear_database")
  const resp = await request.post("http://localhost:3001/message/new", {
    data: {
      text: "Test message",
      channelId: 1
    }
  });
  expect(await resp.json()).toEqual(expect.objectContaining({
    message: {
      "channelId": 1,
      "content": "Test message",
      "createdAt": expect.any(String),
      "id": expect.any(Number),
      "senderId": 1,
      "updatedAt": expect.any(String)
    },
    status: "ok"
  }))
});

test("createMessage API with bad request", async ({ request }) => {
  await request.get("http://localhost:3001/dangerous/only_in_dev/clear_database")
  const resp = await request.post("http://localhost:3001/message/new", {
    data: {
      text: "",
      channelId: 1
    }
  });

  expect(await resp.json()).toEqual(expect.objectContaining({
    status: "error",
    errors: ["text_empty"]
  }))

  const resp2 = await request.post("http://localhost:3001/message/new", {
    data: {
      text: "Test Message",
    }
  });
  expect(await resp2.json()).toEqual(expect.objectContaining({
    status: "error",
    errors: ["channelId_empty"]
  }))
})
