import React from 'react';
import './App.css';

import Routes from './routes';

function App() {
  return (
    <>
    <header className="cabecalho">
      <p>FamInSchool &nbsp;&nbsp;|</p><h4>Familia na escola</h4>
    </header>
    <div className="container">
      <div className="content">
        <Routes/>
      </div>
    </div>
    </>
  );
}

export default App;
