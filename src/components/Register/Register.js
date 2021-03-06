import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {withRouter,Link} from 'react-router-dom'
import {updateUsername,updateUserId,updateAuthenticated,updateAdmin} from '../../redux/reducer'

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
    async componentDidMount () {
        const session = await axios.get('/api/session')
        console.log('session data',session.data)
        if(session.data.user) {
            this.props.updateAuthenticated(session.data.user.authenticated)
            this.props.updateAdmin(session.data.user.admin)
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
        <div className='MenuDiv'>
        <div className='menuTitle'></div>
        <img alt='register background'className='home' src='https://images-na.ssl-images-amazon.com/images/I/91LrWm3FsML.jpg'/>
        <h1 className='MenuText' >Register</h1>
        <div className="form">
        <h2>Username</h2>
        <input name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange}/>
        <div className='names'>
        <div className="firstNames">
        <h2>First Name</h2>
        <input name='first_name' placeholder='First Name' value={this.state.first_name} onChange={this.handleChange}/>
        </div>
        <div className='lastName'>
        <h2>Last Name</h2>
        <input name='last_name' placeholder='Last Name' value={this.state.last_name} onChange={this.handleChange}/>
        </div>
        </div>
        <h2>Email</h2>
        <input name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange}/>
        <h2>Phone</h2>
        <input name='phone' placeholder='Phone' value={this.state.phone} onChange={this.handleChange}/>
        <h2>password</h2>
        <input name='password' placeholder='password' value={this.state.password} onChange={this.handleChange}/>
        {this.props.admin && <div className='custom-select' ><select name='admin' onChange={this.handleChange}>
                    <option  value={false} selected >Customer</option>
                        <option  value={true}>Admin</option>
                        </select> </div>}
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
    updateUsername,
    updateAuthenticated,
    updateAdmin
}
function mapStateToProps (state) {
    return {admin: state.client.admin}
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Register))