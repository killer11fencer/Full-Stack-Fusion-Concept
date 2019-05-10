import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <div className='navbar'>
            <div className='nav'>
               <Link to='/'> <div className='navButtons'>Home</div></Link>
                <Link to='/about'><div className='navButtons'>About</div></Link>
                <Link to='/menu'><div className='navButtons'>Menu</div></Link>
                <Link to='/cart'><div className='navButtons'>Cart</div></Link>
                <Link to='/orders'><div className='navButtons'>Orders</div></Link>
                <Link to='/login'><div className='navButtons'>Login</div></Link>
                <Link to='/register'><div className='navButtons'>register</div></Link>
                </div>
            </div>
        )
    }
}

export default Navbar