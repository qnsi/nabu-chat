import React from "react"
import { GetAllChannels } from "../controllers/ChannelsController";

export type channelType = {id: number, name: string, status: string}
export type channelsArray = Array<channelType>


function ChannelList(props: {channels: channelsArray, setChannels: Function, updateActiveChannel: Function}) {
  React.useEffect(() => {
    GetAllChannels().then((res: {channels: channelsArray, status: string}) => {
      if (res.status === "ok") {
        props.setChannels(res.channels)
      } else {
        //
      }
    })
  }, [])

  function handleChannelClick(e: React.MouseEvent) {
    e.preventDefault()
    let channelId = Number(e.currentTarget.id.substring(8))
    props.updateActiveChannel(channelId)
  }


  return (
    <div className="left-panel">
      {props.channels.map((channel, i) => {
        if (channel.status === "ok") {
          return (<div key={channel.id}><a onClick={handleChannelClick} className="channel"  id={"channel-" + channel.id}>{channel.name}</a></div>);
        } else if (channel.status === "active") {
          return (<div key={channel.id}><a onClick={handleChannelClick} className="channel channel-active"  id={"channel-" + channel.id}>{channel.name}</a></div>);
        }
      })}
    </div>
  )
}

export default ChannelList