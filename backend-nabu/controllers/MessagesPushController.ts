import { messageType } from "..";
import { Request, Response } from "express";

export async function createAndRunMessageEvent(req: Request, res: Response, not_synced_messages: messageType[], clientUUIDSyncArray: Array<{clientUUID: string, lastMessageId: number}>) {
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

  res.write('retry: 10000\n\n');
  var sendingEvents = true

  req.on("close", () => {
    sendingEvents = false
    res.end()
  })

  // function Push to SyncArray
  if (String(req.query.clientUUID) != undefined && Number(req.query.lastMessageId) != undefined) {
    clientUUIDSyncArray.push({clientUUID: String(req.query.clientUUID), lastMessageId: Number(req.query.lastMessageId) })
  } else {
    res.end()
    sendingEvents = false
  }

  while (sendingEvents) {
    await new Promise(resolve => setTimeout(resolve, 300));
    var biggestIdForUUID = Number(req.query.lastMessageId)
    var notSyncedForUUID: messageType[] = []
    for (let message of not_synced_messages) {
      const clientLastId = clientUUIDSyncArray.find(client => client.clientUUID === String(req.query.clientUUID))?.lastMessageId
      if (clientLastId !== undefined) {
        if (message.id > clientLastId) {
          biggestIdForUUID = message.id
          notSyncedForUUID.push(message)
        }
      }
    }

    if (notSyncedForUUID.length > 0) {
      res.write("data: " + JSON.stringify(notSyncedForUUID) +  '\n\n');
      var client = clientUUIDSyncArray.find(client => client.clientUUID === String(req.query.clientUUID))
      if (client) {
        client.lastMessageId = biggestIdForUUID
      }
    } 
  }
}