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
            phone: null,
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
        <div>Create Username</div>
        <input name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange}/>
        <input name='first_name' placeholder='First Name' value={this.state.first_name} onChange={this.handleChange}/>
        <input name='last_name' placeholder='Last Name' value={this.state.last_name} onChange={this.handleChange}/>
        <input name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange}/>
        <input name='phone' placeholder='Phone' value={this.state.phone} onChange={this.handleChange}/>
        <input name='password' placeholder='password' value={this.state.password} onChange={this.handleChange}/>
        {this.props.admin && <select name='admin' onChange={this.handleChange}>
                    <option value={false}selected>Customer</option>
                        <option value={true}>Admin</option>
                        </select>}
        <button onClick={this.handleSubmit}>Submit</button>
        <Link to='/'><button>Cancel</button></Link>
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