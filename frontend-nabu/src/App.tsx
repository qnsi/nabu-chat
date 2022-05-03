import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './components/Chat';
import Navigation from './components/Navigation';
import ChannelList, { channelsArray } from './components/ChannelList'

const initial_channels: channelsArray = []

function App() {
  const [channels, setChannels] = React.useState(initial_channels)

  const [activeChannelId, _setActiveChannelId] = React.useState(0)

  const activeChannelIdRef = React.useRef(activeChannelId)
  function setActiveChannelId(data: number) {
    console.log("Setting ActiveChannelId To: " + data)
    activeChannelIdRef.current = data
    _setActiveChannelId(data)
  }

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
        <ChannelList channels={channels} setChannels={setChannels} updateActiveChannel={updateActiveChannel}/>
        <Chat activeChannelIdRef={activeChannelIdRef}/>
      </div>
    </div>
  );
}

export default App;
