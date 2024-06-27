import { useState } from 'react';
import './App.css';
import Logo from './assets/hearus.svg?react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Logo />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
