import { messageType } from "../components/Chat"

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

export async function GetAllMessages(): Promise<{messages: messageType[], status: string}> {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3001/messages?channelId=1", {
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

function parseMessagesFromJson(jsonArray: Array<{id: number, channelId: number, createAt: string, updatedAt: string, content: string, senderId: number}>) {
  const messages: Array<messageType> = jsonArray.map(message => {
    return {id: message.id, channelId: message.channelId, sender: "Qnsi", text: message.content, status: "ok"}
  })
  return messages
}
