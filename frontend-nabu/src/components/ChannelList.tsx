import React from "react"
import { GetAllChannels } from "../controllers/ChannelsController";

export type channelType = {id: number, name: string, status: string}
export type channelsArray = Array<channelType>
const initial_channels: channelsArray = []


function ChannelList() {
  const [channels, setChannels] = React.useState(initial_channels)
  React.useEffect(() => {
    GetAllChannels().then((res: {channels: channelsArray, status: string}) => {
      if (res.status === "ok") {
        setChannels(res.channels)
      } else {
        //
      }
    })
  }, [])

  React.useEffect(() => {
    console.log(channels)
  }, [channels])

  function handleChannelClick(e: React.MouseEvent) {
    e.preventDefault()
    console.log(e.currentTarget)
    let channelId = Number(e.currentTarget.id.substring(8))
    setChannels((state) => {
      var foundIndex = state.findIndex(x => x.id == channelId);
      var newState = state
      newState[foundIndex].status = "active"
      return newState
    })
  }

  return (
    <div className="left-panel">
      {channels.map((channel, i) => {     
        if (channel.status === "ok") {
          return (<div key={channel.id}><a onClick={handleChannelClick} className="channel"  id={"channel-" + channel.id}>{channel.status}{channel.name}</a></div>);
        } else if (channel.status === "active") {
          return (<div key={channel.id}><a onClick={handleChannelClick} className="channel channel-active"  id={"channel-" + channel.id}>{channel.status}{channel.name}</a></div>);
        }
      })}
    </div>
  )
}

export default ChannelList