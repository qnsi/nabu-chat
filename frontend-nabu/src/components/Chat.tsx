import React from "react";
import ChatTextField from "./ChatTextField";
import ChatMessages from "./ChatMessages";
import { CreateNewMessage, GetAllMessages, setServerSideEvents } from "../controllers/MessagesController";
import { unreadType } from "../App";

export type messageType = {id: number, channelId: number, sender: string, text: string, status: string}
const initial_messages: messageType[] = []

function Chat(props: {activeChannelIdRef: React.MutableRefObject<number>, setUnreads: Function}) {
  const [messages, setMessages] = React.useState(initial_messages)
  const [lastMessageId, setLastMessageId] = React.useState(0)

  React.useEffect(() => {
    const eventSource = setServerSideEvents(setMessages, props.activeChannelIdRef, lastMessageId, props.setUnreads)

    return function cleanup() {
      eventSource.close()
    };
  }, [])

  React.useEffect(() => {
    _getChannelMessagesAndSetState()
  }, [props.activeChannelIdRef.current])


  async function newMessage(message: messageType) {
    const messageWithOrWithoutError: messageType = await CreateNewMessage(message)
    _setMessageForErrorMessage(messageWithOrWithoutError)
  }

  function retrySendingMessage(messageId: number) {
    //TODO
  }

  return (
    <div className="chat">
      <ChatMessages messages={messages} retrySendingMessage={retrySendingMessage}/>
      <ChatTextField newMessage={newMessage} activeChannelIdRef={props.activeChannelIdRef}/>
    </div>
  )

  function _getChannelMessagesAndSetState() {
    if (props.activeChannelIdRef.current !== 0) {
      GetAllMessages(props.activeChannelIdRef.current).then((res: {messages: messageType[], status: string}) => {
        if (res.status === "ok") {
          setLastMessageId(_getLastMessageId(res.messages))
          setMessages(res.messages)
          _cleanUnreadState()
        } else {
          //
        }
      })
    }
  }

  function _getLastMessageId(messages: messageType[]): number {
    var lastMessageId = 0
    if (messages.length > 0) {
      const sortedMessages = messages.sort((a,b) => a.id - b.id)
      lastMessageId = sortedMessages[0].id
    }
    return lastMessageId
  }

  function _cleanUnreadState() {
    props.setUnreads((state: unreadType[]) => {
      return state.map((unread) => {
        if (unread.channelId === props.activeChannelIdRef.current) {
          return { ...unread, count: 0 }
        } else {
          return unread
        }
      })
    })
  }

  function _setMessageForErrorMessage(message: messageType) {
    if (message.status === "error") {
      setMessages((state) => {
         return state.concat([message])
      })
    }
  }
}

export default Chat