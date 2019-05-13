import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }
    componentDidMount () {
        // this.getAllUsers()
    }
    getAllUsers = () => {
        axios.getAllUsers().then(res=>this.setState({users: res.data})).catch(err=> console.log('get all users',err))
    }
    render() {
        let displayUsers = this.state.users.map((user,i)=>
        {return <Link to={`/users/${user.id}`}><div key={i}>
        <div>Username: {user.username}</div>
        <div>Customer Name: {user.first_name}{user.last_name}</div>
        <div>Contact: {user.name}</div>
        </div></Link>})
    return (
        <div>{displayUsers}</div>

    )
        
    }
}
function mapStateToProps (state) {
    return { admin: state.admin}
}
export default connect(mapStateToProps)(Users)