import React from 'react';
import {HashRouter} from 'react-router-dom'
import router from './router'
import store from './redux/store'
import {Provider} from 'react-redux'
import Navbar from './components/Navbar'
import './App.scss';

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
    <Navbar/>
  
    {router}
    
    </Provider>
    </HashRouter>
  );
}

export default App;
