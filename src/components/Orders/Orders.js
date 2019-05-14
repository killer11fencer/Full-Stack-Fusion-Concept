import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


class Orders extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
    }
    componentDidMount() {
        if(!this.props.admin && this.props.authenticated) { return this.getAllOrders()}
        if(this.props.admin) {return this.getAllOrdersAdmin()}
    }
    getAllOrders = async () => {
        axios.get('/api/orders').then(res=>this.setState({orders: res.data}))
    }
    getAllOrdersAdmin = () => {
        axios.get('/api/admin/orders').then(res=>this.setState({orders: res.data}))
    }
    render() {
        console.log(this.state.orders)
        let displayOrders = this.state.orders.map((elem,i)=>{
            return <Link key={i} to={`/orders/${elem.id}`}><div >Order:{elem.id}</div>
                    {this.props.admin && <div><div>Customer: {elem.first_name} {elem.last_name}</div>
                        <div>User ID: {elem.users_id}</div>
                        <div>Contact {elem.phone}</div></div>}
                    <div>Status:{elem.status}</div>
                    <div>Date Created:{elem.created_at}</div>
                    <div>Notes:{elem.notes}</div> </Link>
        })
        return(
            <div>
            <h4>Order History</h4>
            {displayOrders}</div>
        )
    }
}
function mapStateToProps (state) {
    return {admin: state.client.admin,
            adminOrder_id: state.admin.adminOrder_id,
            authenticated: state.client.authenticated
}
}
export default connect(mapStateToProps)(Orders)