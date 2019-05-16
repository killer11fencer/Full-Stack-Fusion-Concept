import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { updateUsername, updateUserId, updateAdmin, updateAuthenticated } from '../../redux/reducer'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            loginUsername: '',
            loginPassword: '',
            loginError: false,
            loginErrorMessage: 'Username or Password is incorrect. Please try again',
            admin: false,
            authenticated: false,


        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = async (e) => {
        const { loginUsername, loginPassword } = this.state
        try {
            const res = await axios.post('/auth/login', { loginUsername, loginPassword })
            this.props.updateUsername(loginUsername)
            this.props.updateUserId(res.data.user_id)
            this.props.updateAdmin(res.data.admin)
            this.props.updateAuthenticated(res.data.authenticated)
            this.props.history.push('/menu')
        } catch (err) {
            this.setState({ loginUsername: '', loginPassword: '', loginError: true, authenticated: false })
        }
    }
    render() {

        return (
            <div className='loginScreen'>
                <img className='background' src='https://raster-static.postmates.com/?url=com.postmates.img.prod.s3.amazonaws.com/c04cf4c5-76d7-4007-a5c4-25dcf9328cdf/orig.jpg&quality=90&w=1500&h=900&mode=crop&format=jpg&v=4' />
                <div className='menuTitle'></div>
                <div className='Login'>
                    <div className='title'>LOGIN</div>
                    <div className='inputNames'>Username</div>
                    <input name='loginUsername' placeholder='Username' value={this.state.loginUsername} onChange={this.handleChange} />
                    <div className='inputNames'>Password</div>
                    <input name='loginPassword' placeholder='Password' value={this.state.loginPassword} onChange={this.handleChange} />
                    <button className='button' onClick={this.handleSubmit}>Login</button>
                    <Link to='/'><button className='button' >Cancel</button></Link>
                    <div>Not a member? <Link to='/register'>Register Here</Link></div>
                    {this.state.loginError && <h3>{this.state.loginErrorMessage}</h3>}
                </div>

                <div className='address'>
                    <div>Fusion Asian</div>
                    <div>Address: 1469 Center st, <br /> Provo, UT 84660</div>
                    <div>Phone: 805 611 91121</div>
                </div>

            </div>
        )
    }
}
const mapDispatchToProps = {
    updateUserId,
    updateUsername,
    updateAdmin,
    updateAuthenticated
}
export default connect(null, mapDispatchToProps)(withRouter(Login))