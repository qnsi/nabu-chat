import React from "react"

function ChatTextField(props: {newMessage: Function }) {
  const [message, updateMessage] = React.useState("")

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault()
    updateMessage(e.currentTarget.value)
  }

  function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    props.newMessage({sender: "Qnsi", text: message})
    updateMessage("")
  }
  return (
    <div className="chat-text-field">
      <form onSubmit={sendMessage}>
        <input type="text" value={message} onChange={handleChange} />
        <input type="submit" value="Send" />
      </form> 
    </div>
  )
}

export default ChatTextField