import React from "react";
import { messageType } from "./Chat";

function ChatMessages(props: {messages: messageType[], retrySendingMessage: Function}) {
  function getMessageClassList(message: messageType): string {
    if (message.status === "ok") {
      return "chat-message"
    } else {
      return "chat-message error"
    }
  }

  function getRetryButton(message: messageType) {
    if (message.status === "ok") {
      return <></>
    } else {
      return (
        <button onClick={() => {props.retrySendingMessage(message.id)}}>
          Something went wrong. Retry?
        </button>
      )
    }
  }

  return (
    <div className="chat-messages">
      {props.messages.map((message, i) => {     
        return (
          <div className={getMessageClassList(message)} key={message.id}>
            {message.sender}: {message.text}
            {getRetryButton(message)}
          </div>
        )
      })}
    </div>
  )
}

export default ChatMessages