import React from 'react';

   
function Cart() {
     const items = ["wireless phones","Power bamks","New ssd","Hoddies"]

    return <>
        <h1>Cart 🛒</h1>
{}
        <ul>
        <h4>👇Products</h4>
          {items.map(item => (

        <li key={Math.random()}>{item}</li>
    ))}
    </ul>
    </>
};

  function App() {

    return (
      <>
    <Cart/>
     </>
    );
  }

export default App;
