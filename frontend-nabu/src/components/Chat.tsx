import React from "react";
import ChatTextField from "./ChatTextField";
import ChatMessages from "./ChatMessages";

export type messageType = {id: number, sender: string, text: string, status: string}
export type messagesArray = Array<messageType>
const initial_messages: messagesArray = [
  {
    id: 1,
    sender: "Qnsi",
    text: "Welcome to our #main channel",
    status: "ok"
  },
  {
    id: 2,
    sender: "Henry",
    text: "Hi! Who am I?",
    status: "ok"
  }
]

function Chat() {
  const [messages, setMessages] = React.useState(initial_messages)

  async function newMessage(message: messageType) {
    const messageWithOrWithoutError: messageType = await new Promise((resolve, reject) => {
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
    setMessages((state) => {
      return state.concat([messageWithOrWithoutError])
    })
  }

  function retrySendingMessage(messageId: number) {
  }

  return (
    <div className="chat">
      <ChatMessages messages={messages} retrySendingMessage={retrySendingMessage}/>
      <ChatTextField newMessage={newMessage}/>
    </div>
  )
}

export default Chat