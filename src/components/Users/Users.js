import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {adminOrder_id,updateUser} from '../../redux/adminReducer'
import {updateAuthenticated,updateAdmin} from '../../redux/reducer'


class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }
    async componentDidMount () {
        const session = await axios.get('/api/session')
        console.log('session data',session.data)
        if(session.data.user) {
            this.props.updateAuthenticated(session.data.user.authenticated)
            this.props.updateAdmin(session.data.user.admin)
        }
        this.getAllUsers()
    }
    getAllUsers = () => {
        axios.get('/api/users').then(res=>this.setState({users: res.data})).catch(err=> console.log('get all users',err))
    }
   createOrder = async (id) => {
    this.props.adminOrder_id(id)
    let users = true;
    this.props.updateUser(users)
    this.props.history.push('/menu')

   }
    render() {

        let displayUsers = this.state.users.map((user,i)=>
        { return <div className='users' key={i}>
        <div><h3>Username:</h3> {user.username}</div>
        <div><h3>Customer Name:</h3> {user.first_name} {user.last_name}</div>
        <div><h3>Contact:</h3> {user.phone}</div>
        <div><h3>Email:</h3> {user.email}</div>
        <button className='createOrder' onClick={(e)=>this.createOrder(user.user_id)}>Create an Order</button></div>})

    return (
        <>
        <div className='menuTitle'></div>
        <img alt='user background'className='home' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Dolsot-bibimbap.jpg/1200px-Dolsot-bibimbap.jpg'/>
        {this.props.admin && <div className='displayUsers'>{displayUsers}</div>}
        </>
    )
        
    }
}
const mapDispatchToProps = {
    adminOrder_id,
    updateUser,
    updateAuthenticated,
    updateAdmin
    
}
function mapStateToProps (state) {
    return { admin: state.client.admin}
}
    
export default connect(mapStateToProps,mapDispatchToProps)(Users)
