import { unreadType } from "../App"
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

export function setServerSideEvents(setMessages: Function, activeChannelIdRef: React.MutableRefObject<number>, lastMessageId: number, setUnreads: Function): EventSource {
  var clientUUID = crypto.randomUUID()
  var eventSource = new EventSource(`http://localhost:3001/messages_event?channelId=${activeChannelIdRef.current}&lastMessageId=${lastMessageId}&clientUUID=${clientUUID}`);

  eventSource.onmessage = e => {
    const messages = parseMessagesFromJson(JSON.parse(e.data))
    setMessages((state: messageType[]) => {
      var notSyncedMessages: messageType[] = []
      for (let message of messages) {
        if (message.channelId === activeChannelIdRef.current) {
          var index = state.findIndex(state_message => state_message.id === message.id) 
          if (index === -1) {
            notSyncedMessages.push(message)
          }
        }
      }
      return state.concat(notSyncedMessages)
    })
    setUnreads((state: unreadType[]) => {
      var updatedCount: unreadType[] = []
      for (let message of messages) {
        if (message.channelId !== activeChannelIdRef.current) {
          var found_updated = updatedCount.find(updated => updated.channelId === message.channelId)
          if (found_updated !== undefined) {
            found_updated.count++
          } else {
            updatedCount.push({channelId: message.channelId, count: 1})
          }
        }
      }

      // We need to join two nonoverlaping arrays. Ids can be [1,2,3] and [2,3,4]
      const newState = state.map((state_unread) => {
        var updated_unread = updatedCount.find(upd => upd.channelId === state_unread.channelId)
        if (updated_unread !== undefined) {
          return {...state_unread, count: state_unread.count+updated_unread.count}
        } else {
          return state_unread
        }
      })

      // Push into state, where no unreads exist
      for (let updated of updatedCount) {
        var found = state.find(unr => unr.channelId === updated.channelId)
        if (found === undefined) {
          newState.push({channelId: updated.channelId, count: updated.count})
        }
      }

      return newState
    })
  }
  return eventSource
}

function parseMessagesFromJson(jsonArray: Array<{id: number, channelId: number, createAt: string, updatedAt: string, content: string, senderId: number}>) {
  const messages: Array<messageType> = jsonArray.map(message => {
    return {id: message.id, channelId: message.channelId, sender: "Qnsi", text: message.content, status: "ok"}
  })
  return messages
}