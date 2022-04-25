import React from "react";
import { messagesArray } from "./Chat";

function ChatMessages(props: {messages: messagesArray}) {
  return (
    <div className="chat-messages">
      {props.messages.map((message, i) => {     
           // Return the element. Also pass key     
          //  return (<Answer key={answer} answer={answer} />) 
          return (<div key={message.text}>{message.sender}: {message.text}</div>)
        })}
    </div>
  )
}

export default ChatMessages