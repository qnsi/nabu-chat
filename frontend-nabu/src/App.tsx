import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <div className="navigation">Nabu</div>
      <div className="main">
        <div className="left-panel">#main</div>
        <Chat />
      </div>
    </div>
  );
}

export default App;
