import React from "react";
import ChatTextField from "./ChatTextField";
import ChatMessages from "./ChatMessages";

export type messageType = {sender: string, text: string}
export type messagesArray = Array<messageType>
const initial_messages: messagesArray = [
  {
    sender: "Qnsi",
    text: "Welcome to our #main channel",
  },
  {
    sender: "Henry",
    text: "Hi! Who am I?"
  }
]

function Chat() {
  const [messages, setMessages] = React.useState(initial_messages)

  function newMessage(message: messageType) {
    setMessages((state) => {
      return state.concat([message])
    })
  }

  return (
    <div className="chat">
      <ChatMessages messages={messages}/>
      <ChatTextField newMessage={newMessage}/>
    </div>
  )
}

export default Chat