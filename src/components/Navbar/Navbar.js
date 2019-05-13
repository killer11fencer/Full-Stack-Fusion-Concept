import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {logout} from '../../redux/reducer'

class Navbar extends Component {

    logOut = async () => {
        axios.get('/auth/logout')
        this.props.logout()
        
    }
    render() {
        console.log('should be logged out',this.props.authenticated)
        console.log('admin',this.props.admin)
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
const mapDispatchToProps = {
    logout
}
function mapStateToProps (state) {
    return {authenticated: state.authenticated,
            admin: state.admin}
}
export default connect(mapStateToProps,mapDispatchToProps)(Navbar)