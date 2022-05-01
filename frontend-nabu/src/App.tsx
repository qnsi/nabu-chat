import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './components/Chat';
import ChannelList from './components/ChannelList'

function App() {
  return (
    <div className="App">
      <div className="navigation">Nabu</div>
      <div className="main">
        <ChannelList />
        <Chat />
      </div>
    </div>
  );
}

export default App;
