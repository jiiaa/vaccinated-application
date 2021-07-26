import React from 'react';

import FormView from './components/FormView';
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Vaccinated Application</h1>
      </div>
      <div className="formview">
        <FormView />
      </div>
    </div>
  );
}

export default App;
