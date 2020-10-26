import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Navbar } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Navbar bg="light">
        <Navbar.Brand>Weather App</Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default App;
