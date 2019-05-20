import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Popup from 'reactjs-popup'
// import {updateAuthenticated,updateAdmin} from '../../redux/reducer'


class Orders extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            status: '',
            notes: ''
        }
    }
    async componentDidMount() {
        // const session = await axios.get('/api/session')
        // console.log('session data',session.data)
        // if(session) {
        //     this.props.updateAuthenticated(session.data.user.authenticated)
        //     this.props.updateAdmin(session.data.user.admin)
        // }
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
    orderCompleted = async (id,phone,firstname,lastname) => {
        let status = 'Completed'
        let notes = 'Order ready for pick up'
        let name = `${firstname} ${lastname}`

        await axios.put(`api/admin/orders/${id}`, { status, notes }).then(res => console.log(res.data)).catch(err=> console.log('err on complete order',err))
        
        axios.post('/api/admin/complete',{phone,name}).then(console.log('Successful')).catch(err=> console.log('err on complete', err))
        this.getAllOrdersAdmin()
        
    }
    
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        console.log(this.state.orders)
        let displayOrders = this.state.orders.map((elem, i) => {
            return <div className='orderDetails'key={i} ><Link to={`/orders/${elem.id}`}><div ><h2>Order: {elem.id}</h2></div>
                
                {this.props.admin && <div className='adminOrderDetails'><div>Customer: {elem.first_name} {elem.last_name}</div>
                    <div>User ID: {elem.users_id}</div>
                    <div>Contact {elem.phone}</div></div>}
                <div>Status: {elem.status}</div>
                <div>Date Created: {elem.created_at}</div>
                <div>Notes: {elem.notes}</div> </Link> {this.props.admin && <Popup className='modal' trigger={<button className='ordersUpdateStatus'>Update</button>} position='right'>
                    <div>Update Status:</div>
                    <input defaultValue={elem.status} name='status' onChange={this.handleChange} />
                    <div>Add Notes:</div>
                    <input defailtValue={elem.notes} name='notes' onChange={this.handleChange} />
                    <button onClick={(e) => this.orderStatusUpdate(elem.id)}>Submit</button>
                </Popup>

            }
               {this.props.admin && <button className='CompletedButton'onClick={(e)=>this.orderCompleted(elem.id,elem.phone,elem.first_name,elem.last_name)}>Order Completed</button>}
                </div>
        })
        return (
            <div className='MenuDiv'>
                <img alt='background'className='home' src='https://thepioneerwoman.com/wp-content/uploads/2018/09/5-easy-korean-side-dishes-banchan-ebb098ecb0ac-33.jpg'/>
                <div className='menuTitle'></div>
                <h1 className='MenuText'>Order History</h1>
                <div className='orders'>{displayOrders}</div>
                <div className='address'>
                    <div>Fusion Asian</div>
                    <div>Address: 1469 Center st, <br /> Provo,UT 84660</div>
                    <div>Phone: 805 611 91121</div>
                </div>
                </div>
        )
    }
}
// const mapDispatchToProps = {
//  updateAuthenticated,
//  updateAdmin
// }
function mapStateToProps(state) {
    return {
        admin: state.client.admin,
        adminOrder_id: state.admin.adminOrder_id,
        authenticated: state.client.authenticated
    }
}
export default connect(mapStateToProps)(Orders)