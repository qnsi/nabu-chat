import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './components/Chat';
import Navigation from './components/Navigation';
import ChannelList from './components/ChannelList'

export type channelType = {id: number, name: string, status: string}
const initialChannels: channelType[] = []

export type unreadType = {channelId: number, count: number}
const initialUnreads: unreadType[] = []

function App() {
  const [channels, setChannels] = React.useState(initialChannels)
  const {activeChannelIdRef, setActiveChannelId} = _useStateActiveChannelIdUsingRefs()
  const [unreads, setUnreads] = React.useState(initialUnreads)

  return (
    <div className="App">
      <Navigation channels={channels} setActiveChannelId={setActiveChannelId}/>
      <div className="main">
        <ChannelList channels={channels} setChannels={setChannels} activeChannelIdRef={activeChannelIdRef} setActiveChannelId={setActiveChannelId} unreads={unreads}/>
        <Chat activeChannelIdRef={activeChannelIdRef} setUnreads={setUnreads}/>
      </div>
    </div>
  );

  function _useStateActiveChannelIdUsingRefs() {
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
