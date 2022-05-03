import { messagesArray, messageType } from "../components/Chat"

export async function CreateNewMessage(message: messageType): Promise<messageType> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3001/message/new", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    }).then(res => {
      if (res.ok) {
        res.json().then(json => { 
          message.status = "ok"
          resolve(message)
        })
      } else {
        message.status = "error"
        resolve(message)
      }
    }).catch(error => {
      message.status = "error"
      resolve(message)
    })
  })
}

export async function GetAllMessages(channelId: number): Promise<{messages: messageType[], status: string}> {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3001/messages?channelId=${channelId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    }).then(res => {
      if (res.ok) {
        res.json().then(jsonArray => {
          resolve({status: "ok", messages: parseMessagesFromJson(jsonArray.messages)})
        })
      } else {
        resolve({messages: [], status: "error"})
      }
    }).catch(error => {
      console.log(error)
      resolve({messages: [], status: "error"})
    })
  })
}

export function setServerSideEvents(setMessages: Function, activeChannelId: number, lastMessageId: number) {
  var clientUUID = crypto.randomUUID()
  var eventSource = new EventSource(`http://localhost:3001/messages_event?channelId=${activeChannelId}&lastMessageId=${lastMessageId}&clientUUID=${clientUUID}`);

  eventSource.onmessage = e => {
    console.log("Inside eventSource on message. ActiveChannelId: " + activeChannelId)
    const messages = parseMessagesFromJson(JSON.parse(e.data))
    setMessages((state: messagesArray) => {
      var notSyncedMessages: messagesArray = []
      for (let message of messages) {
        if (message.channelId === activeChannelId) {
          var index = state.findIndex(state_message => state_message.id === message.id) 
          if (index === -1) {
            notSyncedMessages.push(message)
          }
        }
      }
      return state.concat(notSyncedMessages)
    })
  }
}

function parseMessagesFromJson(jsonArray: Array<{id: number, channelId: number, createAt: string, updatedAt: string, content: string, senderId: number}>) {
  const messages: Array<messageType> = jsonArray.map(message => {
    return {id: message.id, channelId: message.channelId, sender: "Qnsi", text: message.content, status: "ok"}
  })
  return messages
}