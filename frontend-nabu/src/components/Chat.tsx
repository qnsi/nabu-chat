import React from "react";
import ChatTextField from "./ChatTextField";
import ChatMessages from "./ChatMessages";
import { CreateNewMessage, GetAllMessages } from "../controllers/MessagesController";

export type messageType = {id: number, channelId: number, sender: string, text: string, status: string}
export type messagesArray = Array<messageType>
const initial_messages: messagesArray = []


function Chat(props: {activeChannelId: number}) {
  const [messages, setMessages] = React.useState(initial_messages)

  React.useEffect(() => {
    if (props.activeChannelId !== 0) {
      GetAllMessages(props.activeChannelId).then((res: {messages: messageType[], status: string}) => {
        if (res.status === "ok") {
          setMessages(res.messages)
        } else {
          //
        }
      })
    }
  }, [props.activeChannelId])

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
      <ChatTextField newMessage={newMessage} activeChannelId={props.activeChannelId}/>
    </div>
  )
}

export default Chat