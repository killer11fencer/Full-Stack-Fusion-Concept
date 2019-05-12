import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

class Navbar extends Component {

    logOut = () => {
        axios.get('/auth/logout')
    }
    render() {
        return (
            <div className='navbar'>

            <div className='nav'>
               <Link to='/'> <div className='navButtons'>Home</div></Link>
                <Link to='/about'><div className='navButtons'>About</div></Link>
                <Link to='/menu'><div className='navButtons'>Menu</div></Link>
                <Link to='/cart'><div className='navButtons'>Cart</div></Link>
                <Link to='/orders'><div className='navButtons'>Orders</div></Link>
                {!this.props.authenticated && <Link to='/login'><div className='navButtons'>Login</div></Link>}
                {this.props.authenticated && <Link to='/'><div onClick={this.logOut}>Log Out</div></Link>}
                <Link to='/register'><div className='navButtons'>register</div></Link>
                
                </div>
            </div>
        )
    }
}
function mapStateToProps (state) {
    return {authenticated: state.authenticated}
}
export default connect(mapStateToProps)(Navbar)