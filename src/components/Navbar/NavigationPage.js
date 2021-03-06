import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {logout,updateAuthenticated,updateAdmin} from '../../redux/reducer'
import {cancelOrder} from '../../redux/adminReducer'


class NavigationPage extends Component {

async componentDidMount () {
    const session = await axios.get('/api/session')
        console.log('session data',session.data)
        if(session.data.user) {
            this.props.updateAuthenticated(session.data.user.authenticated)
            this.props.updateAdmin(session.data.user.admin)
        }
}
    
    logOut = async () => {
        axios.get('/auth/logout')
        this.props.cancelOrder()
        this.props.logout()
        
    }
    render() {
        console.log('authenticated',this.props.authenticated)
        console.log('admin',this.props.admin)
        return (
            <div className='mobile'>

            <div className='mobileView'>
               <Link to='/'> <div className='Buttons'>Home</div></Link>
               <Link to='/about'><div className='Buttons'>About</div></Link>
                {this.props.admin && <Link to='/users'><div className='Buttons'>Users</div></Link>}
                <Link to='/menu'><div className='Buttons'>Menu</div></Link>
                <Link to='/cart'><div className='Buttons'>Cart</div></Link>
                <Link to='/orders'><div className='Buttons'>Orders</div></Link>
                {!this.props.authenticated && <Link to='/login'><div className='Buttons'>Login</div></Link>}
                {this.props.authenticated && <Link to='/'><div className='Buttons' onClick={this.logOut}>Log Out</div></Link>}
                <Link to='/register'><div className='Buttons'>Register</div></Link>
                
                </div>

              
            </div>
        )
    }
}
const mapDispatchToProps = {
    logout,
    cancelOrder,
    updateAuthenticated,
    updateAdmin
  
}
function mapStateToProps (state) {
    return {authenticated: state.client.authenticated,
            admin: state.client.admin}
}
export default connect(mapStateToProps,mapDispatchToProps)(NavigationPage)