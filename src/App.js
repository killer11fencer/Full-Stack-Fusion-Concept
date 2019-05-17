import React from 'react';
import {HashRouter} from 'react-router-dom'
import router from './router'
import store from './redux/store'
import {Provider} from 'react-redux'
import Navbar from './components/Navbar/Navbar'
import './App.scss';

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
      <div className='App'>
    <Navbar/>
  
    {router}
    </div>
    </Provider>
    </HashRouter>
  );
}

export default App;
