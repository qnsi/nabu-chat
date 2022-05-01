import React from "react"

function ChatTextField(props: {newMessage: Function, activeChannelId: number}) {
  const [message, updateMessage] = React.useState("")

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault()
    updateMessage(e.currentTarget.value)
  }

  function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    props.newMessage({id: 0, sender: "Qnsi", text: message, status: "waiting", channelId: props.activeChannelId})
    updateMessage("")
  }
  return (
    <div className="chat-message-form">
      <form onSubmit={sendMessage}>
        <input className="chat-text-field" type="text" value={message} onChange={handleChange} />
        <input className="chat-submit" type="submit" value="Send" />
      </form> 
    </div>
  )
}

export default ChatTextField