import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './components/Chat';
import ChannelList, { channelsArray } from './components/ChannelList'

const initial_channels: channelsArray = []

function App() {
  const [channels, setChannels] = React.useState(initial_channels)

  const [activeChannelId, setActiveChannelId] = React.useState(0)

  React.useEffect(() => {
    var activeIndex = channels.findIndex(x => x.status == "active")
    if (activeIndex !== -1) {
      setActiveChannelId(channels[activeIndex].id)
    }
  }, [channels])
  return (
    <div className="App">
      <div className="navigation">Nabu</div>
      <div className="main">
        <ChannelList channels={channels} setChannels={setChannels}/>
        <Chat activeChannelId={activeChannelId}/>
      </div>
    </div>
  );
}

export default App;
