import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Cart from './components/Cart/Cart'
import Register from './components/Register/Register'
import OrderDetails from './components/Orders/OrderDetails'
import Orders from './components/Orders/Orders'
import Menu from './components/Menu/Menu'
import MenuItems from './components/Menu/MenuItems'
import CreateNewDish from './components/CreateNewDish/CreateNewDish'
import Users from './components/Users/Users'
import NavigationPage from './components/Navbar/NavigationPage'
import About from './components/About/About'

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route exact path='/orders' component={Orders}/>
        <Route path='/orders/:id' component={OrderDetails}/>
        <Route path='/cart' component={Cart}/>
        <Route exact path='/menu' component={Menu}/>
        <Route  path='/menu/:id' component={MenuItems}/>
        <Route path='/addnew' component={CreateNewDish}/>
        <Route exact path='/users' component={Users}/>
       <Route path='/navigation' component={NavigationPage}/>
       <Route path='/about' component={About}/>
      
    </Switch>
)