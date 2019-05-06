import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
import Register from './components/Register'
import Orders from './components/Orders'
import Menu from './components/Menu/Menu'
import MenuItems from './components/Menu/MenuItems'

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/orders' component={Orders}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/menu' component={Menu}/>
        <Route path='/menu/food' component={MenuItems}/>
    </Switch>
)