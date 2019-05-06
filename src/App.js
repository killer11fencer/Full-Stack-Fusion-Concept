import React from 'react';
import {HashRouter} from 'react-router-dom'
import router from './router'
import store from './redux/store'
import {Provider} from 'react-redux'
import './App.css';

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
    <div className="App">
  
    {router}
    </div>
    </Provider>
    </HashRouter>
  );
}

export default App;
