import React from 'react';
import logo from './logo.svg';
import './App.css';

const formatName = (user:User):String => user.firstName + ' ' + user.lastName;

type User = {
  firstName: String,
  lastName: String
}

const user:User = {
  firstName: 'Poop',
  lastName: 'Perez',
}

const testEl = (
  <h1 className="greeting">Hello world!</h1>
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello, {formatName(user)}!
        </p>
        {testEl}
      </header>
    </div>
  );
}

export default App;
