import React from "react";
import ChatTextField from "./ChatTextField";
import ChatMessages from "./ChatMessages";
import { CreateNewMessage, GetAllMessages } from "../controllers/MessagesController";

export type messageType = {id: number, sender: string, text: string, status: string}
export type messagesArray = Array<messageType>
const initial_messages: messagesArray = [
]

function Chat() {
  const [messages, setMessages] = React.useState(initial_messages)
  React.useEffect(() => {
    GetAllMessages().then((res: {messages: messageType[], status: string}) => {
      if (res.status === "ok") {
        console.log(res.messages)
        setMessages(res.messages)
      } else {
        //
      }
    })
  }, [])

  async function newMessage(message: messageType) {
    const messageWithOrWithoutError: messageType = await CreateNewMessage(message)
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