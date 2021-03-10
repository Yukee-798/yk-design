import React from 'react';
import Button, {ButtonTypes, ButtonSizes} from './components/Button/button'
import './App.scss'
function App() {

  const handleClick = () => {
    console.log(123);
  }
  
  return (
    <div className="App">

      <div>
        <Button btnType={ButtonTypes.Primary} onClick={handleClick}>primary</Button>
        <Button>default</Button>
        <Button btnType={ButtonTypes.Danger}>danger</Button>
        <Button btnType={ButtonTypes.Link} href='#'>link</Button>
      </div>

      <div>
        <Button disabled>default disabled</Button>
        <Button disabled btnType={ButtonTypes.Link} href='#'>link disabled</Button>
      </div>

      <div>
        <Button size={ButtonSizes.Large}>Large</Button>
        <Button size={ButtonSizes.Normal}>Normal</Button>
        <Button size={ButtonSizes.Small}>Small</Button>
      </div>

    </div>
  );
}

export default App;
