import React from "react";
import ChatTextField from "./ChatTextField";
import ChatMessages from "./ChatMessages";
import { CreateNewMessage, GetAllMessages, setServerSideEvents } from "../controllers/MessagesController";

export type messageType = {id: number, channelId: number, sender: string, text: string, status: string}
export type messagesArray = Array<messageType>
const initial_messages: messagesArray = []


function Chat(props: {activeChannelId: number}) {
  const [messages, setMessages] = React.useState(initial_messages)
  const [lastMessageId, setLastMessageId] = React.useState(0)

  React.useEffect(() => {
    if (props.activeChannelId !== 0) {
      GetAllMessages(props.activeChannelId).then((res: {messages: messageType[], status: string}) => {
        if (res.status === "ok") {
          var lastMessageId = 0
          if (res.messages.length > 0) {
            const sortedMessages = res.messages.sort((a,b) => a.id - b.id)
            lastMessageId = sortedMessages[0].id
          }
          setLastMessageId(lastMessageId)
          setServerSideEvents(setMessages, props.activeChannelId, lastMessageId)
          setMessages(res.messages)
        } else {
          //
        }
      })
    }
  }, [props.activeChannelId])


  async function newMessage(message: messageType) {
    const messageWithOrWithoutError: messageType = await CreateNewMessage(message)
    if (messageWithOrWithoutError.status === "error") {
      setMessages((state) => {
         return state.concat([messageWithOrWithoutError])
      })
    }
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