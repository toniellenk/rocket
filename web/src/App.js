import React, { useState } from 'react';


function App() {

  let [counter, setCounter] = useState(0);

  function countIncrement() {
    setCounter(counter + 1);
  };

  return (
    <>
      <h1>Contador: {counter}</h1>
      <button onClick={countIncrement}>Incrementar</button>
    </>
  );
}

export default App;
