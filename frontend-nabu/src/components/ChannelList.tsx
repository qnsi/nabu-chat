import React from "react"
import { channelType, unreadType } from "../App";
import { GetAllChannels } from "../controllers/ChannelsController";



function ChannelList(props: {channels: channelType[], setChannels: Function, activeChannelIdRef: React.MutableRefObject<number>, setActiveChannelId: Function, unreads: unreadType[]}) {
  React.useEffect(() => {
    GetAllChannels().then((res: {channels: channelType[], status: string}) => {
      if (res.status === "ok") {
        props.setChannels(res.channels)
        _setActiveChannelIdToMain(res.channels)
      } else {
        //
      }
    })
  }, [])

  function handleChannelClick(e: React.MouseEvent) {
    e.preventDefault()
    let channelId = Number(e.currentTarget.id.substring(8))
    props.setActiveChannelId(channelId)
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

        if (channel.id === props.activeChannelIdRef.current) {
          return (
          <div className="channel-parent" key={channel.id}>
            <a onClick={handleChannelClick} className="channel channel-active"  id={"channel-" + channel.id}>{channel.name}</a>
            {unread_div}
          </div>);
        } else {
          return (
          <div className="channel-parent" key={channel.id}>
            <a onClick={handleChannelClick} className="channel"  id={"channel-" + channel.id}>{channel.name}</a>
            {unread_div}
          </div>);
        }
      })}
    </div>
  )

  function _setActiveChannelIdToMain(channels: channelType[]) {
    const mainChannelId = channels.find(channel => channel.name === "main")
    if (mainChannelId) {
      props.setActiveChannelId(mainChannelId.id)
    }
  }
}

export default ChannelList