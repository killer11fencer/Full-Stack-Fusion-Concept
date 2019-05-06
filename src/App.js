import React from 'react';
import {HashRouter} from 'react-router-dom'
import router from './router'
import './App.css';

function App() {
  return (
    <HashRouter>
    <div className="App">
  
    {router}
    </div>
    </HashRouter>
  );
}

export default App;
