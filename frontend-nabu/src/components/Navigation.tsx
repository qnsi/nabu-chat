import React, { FormEvent } from "react"
import { channelType } from "../App";

function Navigation(props: {channels: channelType[], setActiveChannelId: Function}) {
  const [searchText, setSearchText] = React.useState("")

  function handleSearch(e: FormEvent<HTMLInputElement>) {
    e.preventDefault()
    setSearchText(e.currentTarget.value)
  }

  function changeActiveChannel(e: React.MouseEvent) {
    const clickedChannel = props.channels.find(channel => channel.name == e.currentTarget.textContent);
    if (clickedChannel != undefined) {
      props.setActiveChannelId(clickedChannel.id)
      setSearchText("")
    }
  }

  let searchSuggestions;
  
  if (searchText !== "") {
    searchSuggestions = _prepareSearchSuggestions()
  } else {
    searchSuggestions = <></>
  }

  return (
      <div className="navigation">
        <div className="logo">Nabu</div>
        <form className="search-bar-form">
          <input className="search-bar" type="text" value={searchText} onChange={handleSearch} />
          {searchSuggestions}
        </form> 
      </div>
  )

  function _prepareSearchSuggestions() {
    return (<div className="search-suggestions">
      {props.channels.map((channel, i) => {
        if (channel.name.includes(searchText)) {
          return (<div onClick={changeActiveChannel}className="search-suggestion" key={i}>{channel.name}</div>)
        }
      })}
    </div>)
  }
}

export default Navigation
