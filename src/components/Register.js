import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateUsername,updateUserId} from '../redux/reducer'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            phone: null,
            email: ''
            
            
        }
    }
handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
}
handleSubmit = async (e) => {
    let {username,password,first_name,last_name,phone,email} = this.state
    phone = +phone
    try {
        const res = await axios.post('/auth/register',{username,password,first_name,last_name,phone,email})
        this.props.updateUsername(username)
        this.props.updateUserId(res.data.user_id)
        this.props.history.push('/menu')
    } catch(err) {
        this.setState({username:'',password: '', first_name: '',last_name:'',phone:'',email:'',})
    }
}
render() {
    return(
        <div className='register'>
        <div>Create Username</div>
        <input name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange}/>
        <input name='first_name' placeholder='First Name' value={this.state.first_name} onChange={this.handleChange}/>
        <input name='last_name' placeholder='Last Name' value={this.state.last_name} onChange={this.handleChange}/>
        <input name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange}/>
        <input name='phone' placeholder='Phone' value={this.state.phone} onChange={this.handleChange}/>
        <input name='password' placeholder='password' value={this.state.password} onChange={this.handleChange}/>
        <button onClick={this.handleSubmit}>Submit</button>
        </div>
    )
}
}

const mapDispatchToProps = {
    updateUserId,
    updateUsername
}
export default connect(null,mapDispatchToProps)(withRouter(Register))