import React from 'react';
import Hello from './components/Hello/Hello';
import LikeButton from './components/LikeButton/LikeButton';
import './App.css';


function App() {
  return (
    <div className="App">
      <Hello message='Hello yk-design'/>
      <LikeButton />
    </div>
  );
}

export default App;
