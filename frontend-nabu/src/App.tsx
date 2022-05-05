import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './components/Chat';
import Navigation from './components/Navigation';
import ChannelList, { channelsArray } from './components/ChannelList'

const initial_channels: channelsArray = []

export type unreadType = {channelId: number, count: number}
const initialUnreads: unreadType[] = []

function App() {
  const [channels, setChannels] = React.useState(initial_channels)
  const {activeChannelIdRef, setActiveChannelId} = useStateActiveChannelIdUsingRefs()
  const [unreads, setUnreads] = React.useState(initialUnreads)

  React.useEffect(() => {
    var activeIndex = channels.findIndex(x => x.status == "active")
    if (activeIndex !== -1) {
      setActiveChannelId(channels[activeIndex].id)
    }
  }, [channels])

  function updateActiveChannel(channelId: number) {
    setActiveChannelId(channelId)
    setChannels((state: channelsArray) => {
      var clickedIndex = state.findIndex(x => x.id == channelId);
      var lastActiveIndex = state.findIndex(x => x.status == "active")

      var nextState = state.slice()

      nextState[lastActiveIndex].status = "ok"
      nextState[clickedIndex].status = "active"

      return nextState
    })
  }

  return (
    <div className="App">
      <Navigation channels={channels} updateActiveChannel={updateActiveChannel}/>
      <div className="main">
        <ChannelList channels={channels} setChannels={setChannels} updateActiveChannel={updateActiveChannel} unreads={unreads}/>
        <Chat activeChannelIdRef={activeChannelIdRef} setUnreads={setUnreads}/>
      </div>
    </div>
  );

  function useStateActiveChannelIdUsingRefs() {
    const [activeChannelId, _setActiveChannelId] = React.useState(0)

    const activeChannelIdRef = React.useRef(activeChannelId)
    const setActiveChannelId = (data: number) => {
      activeChannelIdRef.current = data
      _setActiveChannelId(data)
    }
    return {activeChannelIdRef: activeChannelIdRef, setActiveChannelId: setActiveChannelId}
  }

}

export default App;
