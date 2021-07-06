import React from 'react';

import ViewTotal from './components/ViewTotal';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Vaccinated Application</h1>
      </div>
      <div className="viewtotal">
        <ViewTotal />
      </div>
    </div>
  );
}

export default App;
