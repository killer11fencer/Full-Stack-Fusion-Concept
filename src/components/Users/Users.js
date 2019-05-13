import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {adminOrder_id,updateUser} from '../../redux/adminReducer'


class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }
    componentDidMount () {
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
        { return <div key={i}>
        <div>Username: {user.username}</div>
        <div>Customer Name: {user.first_name} {user.last_name}</div>
        <div>Contact: {user.phone}</div>
        <div>Email: {user.email}</div>
        <button onClick={(e)=>this.createOrder(user.user_id)}>Create an Order</button></div>})

    return (
        <div>{displayUsers}</div>

    )
        
    }
}
const mapDispatchToProps = {
    adminOrder_id,
    updateUser
}
function mapStateToProps (state) {
    return { admin: state.client.admin}
}
    
export default connect(mapStateToProps,mapDispatchToProps)(Users)
