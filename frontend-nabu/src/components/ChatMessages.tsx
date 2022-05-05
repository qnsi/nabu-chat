import React from "react";
import { messageType } from "./Chat";

function ChatMessages(props: {messages: messageType[], retrySendingMessage: Function}) {
  function retrySendingMessage(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    // e.currentTarget.parentElement.key
    props.retrySendingMessage("id")
  }

  return (
    <div className="chat-messages">
      {props.messages.map((message, i) => {     
           // Return the element. Also pass key     
          //  return (<Answer key={answer} answer={answer} />) 
          if (message.status === "ok") {
            return (<div className="chat-message" key={message.id}>{message.sender}: {message.text}</div>)
          } else if (message.status === "error") {
            return (<div className="chat-message error" key={message.id}>
              {message.sender}: {message.text}
              <button onClick={retrySendingMessage}>Something went wrong. Retry?</button>
            </div>)
          }
        })}
    </div>
  )
}

export default ChatMessages