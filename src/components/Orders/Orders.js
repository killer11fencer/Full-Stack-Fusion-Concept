import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Popup from 'reactjs-popup'


class Orders extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            status: '',
            notes: ''
        }
    }
    componentDidMount() {
        if (!this.props.admin && this.props.authenticated) { return this.getAllOrders() }
        if (this.props.admin) { return this.getAllOrdersAdmin() }
    }
    getAllOrders = async () => {
        axios.get('/api/orders').then(res => this.setState({ orders: res.data }))
    }
    getAllOrdersAdmin = () => {
        axios.get('/api/admin/orders').then(res => this.setState({ orders: res.data }))
    }
    orderStatusUpdate = async (id) => {
        let { status, notes } = this.state
        await axios.put(`api/admin/orders/${id}`, { status, notes }).then(res => this.setState({ orders: res.data }))
        this.getAllOrdersAdmin()
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        console.log(this.state.orders)
        let displayOrders = this.state.orders.map((elem, i) => {
            return <div><Link key={i} to={`/orders/${elem.id}`}><div >Order:{elem.id}</div>
                
                {this.props.admin && <div><div>Customer: {elem.first_name} {elem.last_name}</div>
                    <div>User ID: {elem.users_id}</div>
                    <div>Contact {elem.phone}</div></div>}
                <div>Status:{elem.status}</div>
                <div>Date Created:{elem.created_at}</div>
                <div>Notes:{elem.notes}</div> </Link> {this.props.admin && <Popup className='modal' trigger={<button>Update</button>} position='right'>
                    <div>Update Status:</div>
                    <input defaultValue={elem.status} name='status' onChange={this.handleChange} />
                    <div>Add Notes:</div>
                    <input defailtValue={elem.notes} name='notes' onChange={this.handleChange} />
                    <button onClick={(e) => this.orderStatusUpdate(elem.id)}>Submit</button>
                </Popup>}
               
                </div>
        })
        return (
            <div>
                <h4>Order History</h4>
                {displayOrders}</div>
        )
    }
}
function mapStateToProps(state) {
    return {
        admin: state.client.admin,
        adminOrder_id: state.admin.adminOrder_id,
        authenticated: state.client.authenticated
    }
}
export default connect(mapStateToProps)(Orders)