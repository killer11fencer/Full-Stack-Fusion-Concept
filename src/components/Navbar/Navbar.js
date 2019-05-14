import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {logout} from '../../redux/reducer'
import {cancelOrder} from '../../redux/adminReducer'


class Navbar extends Component {


    
    logOut = async () => {
        axios.get('/auth/logout')
        this.props.cancelOrder()
        this.props.logout()
        
    }
    render() {
        console.log('authenticated',this.props.authenticated)
        console.log('admin',this.props.admin)
        return (
            <div className='navbar'>
            <img  className='logo' alt='logo'src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Taegeuk.svg/220px-Taegeuk.svg.png'/>
            <h1 className='company'>Fusion Asian</h1>
            <Link to={'/navigation'}><i class="fas fa-bars menu"></i></Link>
            <div className='nav'>
               <Link to='/'> <div className='navButtons'>Home</div></Link>
               <Link to='/about'><div className='navButtons'>About</div></Link>
                {this.props.admin && <Link to='/users'><div className='navButtons'>Users</div></Link>}
                <Link to='/menu'><div className='navButtons'>Menu</div></Link>
                <Link to='/cart'><div className='navButtons'>Cart</div></Link>
                <Link to='/orders'><div className='navButtons'>Orders</div></Link>
                {!this.props.authenticated && <Link to='/login'><div className='navButtons'>Login</div></Link>}
                {this.props.authenticated && <Link to='/'><div onClick={this.logOut}>Log Out</div></Link>}
                <Link to='/register'><div className='navButtons'>Register</div></Link>
                
                </div>

              
            </div>
        )
    }
}
const mapDispatchToProps = {
    logout,
    cancelOrder
  
}
function mapStateToProps (state) {
    return {authenticated: state.client.authenticated,
            admin: state.client.admin}
}
export default connect(mapStateToProps,mapDispatchToProps)(Navbar)