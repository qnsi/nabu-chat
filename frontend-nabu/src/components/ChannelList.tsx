import React from "react"
import { unreadType } from "../App";
import { GetAllChannels } from "../controllers/ChannelsController";

export type channelType = {id: number, name: string, status: string}
export type channelsArray = Array<channelType>


function ChannelList(props: {channels: channelsArray, setChannels: Function, updateActiveChannel: Function, unreads: unreadType[]}) {
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

  function getUnreadCountForChannel(channel: channelType) {
    const unread = props.unreads.find(unr => unr.channelId === channel.id)
    var unread_count = 0
    if (unread !== undefined) {
      unread_count = unread.count
    }
    return unread_count
  }

  return (
    <div className="left-panel">
      {props.channels.map((channel, i) => {
        const unread_count = getUnreadCountForChannel(channel)
        let unread_div = <></>
        if (unread_count > 0) {
          unread_div = <div className="channel-unread">{unread_count}</div>
        }

        if (channel.status === "ok") {
          return (
          <div className="channel-parent" key={channel.id}>
            <a onClick={handleChannelClick} className="channel"  id={"channel-" + channel.id}>{channel.name}</a>
            {unread_div}
          </div>);
        } else if (channel.status === "active") {
          return (
          <div className="channel-parent" key={channel.id}>
            <a onClick={handleChannelClick} className="channel channel-active"  id={"channel-" + channel.id}>{channel.name}</a>
            {unread_div}
          </div>);
        }
      })}
    </div>
  )
}

export default ChannelList