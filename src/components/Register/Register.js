import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {withRouter,Link} from 'react-router-dom'
import {updateUsername,updateUserId} from '../../redux/reducer'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            admin: false
            
            
        }
    }
handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
}
handleSubmit = async (e) => {
    let {username,password,first_name,last_name,phone,email,admin} = this.state
    phone = +phone
    try {
        const res = await axios.post('/auth/register',{username,password,first_name,last_name,phone,email,admin})
        this.props.updateUsername(username)
        this.props.updateUserId(res.data.user_id)
        this.props.history.push('/login')
    } catch(err) {
        this.setState({username:'',password: '', first_name: '',last_name:'',phone:'',email:'',admin: false})
    }  
}
cancelAction = (e) => {
    this.setState({username:'',password: '', first_name: '',last_name:'',phone:'',email:'',admin: false})
}
render() {
    console.log('register',this.state.admin)
    return(
        <div className='register'>
        <div className='menuTitle'></div>
        <img alt='register background'className='home' src='https://images-na.ssl-images-amazon.com/images/I/91LrWm3FsML.jpg'/>
        <div className='MenuText'><h1>Register</h1></div>
        <div className="form">
        <h2>Username</h2>
        <input name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange}/>
        
        
        <div className="inputs">
        <h2>First Name</h2>
        <h2>Last Name</h2>
        </div>
        
        <div className="names">
        <input name='first_name' placeholder='First Name' value={this.state.first_name} onChange={this.handleChange}/>
        <input name='last_name' placeholder='Last Name' value={this.state.last_name} onChange={this.handleChange}/>
        </div>
        <h2>Email</h2>
        <input name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange}/>
        <h2>Phone</h2>
        <input name='phone' placeholder='Phone' value={this.state.phone} onChange={this.handleChange}/>
        <h2>password</h2>
        <input name='password' placeholder='password' value={this.state.password} onChange={this.handleChange}/>
        {this.props.admin && <select name='admin' onChange={this.handleChange}>
                    <option value={false}selected>Customer</option>
                        <option value={true}>Admin</option>
                        </select>}
        <button className='registerSubmit' onClick={this.handleSubmit}>Submit</button>
        <Link to='/'><button className='registerCancel'>Cancel</button></Link>
        </div>
        <div className='address'>
                    <div>Fusion Asian</div>
                    <div>Address: 1469 Center st, <br /> Provo,UT 84660</div>
                    <div>Phone: 805 611 91121</div>
                </div>
        </div>
    )
}
}

const mapDispatchToProps = {
    updateUserId,
    updateUsername
}
function mapStateToProps (state) {
    return {admin: state.client.admin}
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Register))