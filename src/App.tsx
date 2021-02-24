import React from 'react';
import Hello from './components/Hello/Hello';
import LikeButton from './components/LikeButton/LikeButton';

import './App.css';
import useMousePosition from './hooks/useMousePosition';
// import MouseTracker from './components/MouseTracker/MouseTracker';


function App() {
  const [position, setPostion] = useMousePosition();
  // const [a, b, c] = [1, 2, 3];

  console.log(position);
  return (
    <div className="App">
      <Hello message='Hello yk-design'/>
      <LikeButton />
      {/* <p>{`(${position.x}, ${position.y})`}</p> */}
    </div>
  );
}

export default App;
