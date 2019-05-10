import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Orders extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
    }
    componentDidMount() {
        this.getAllOrders()
    }
    getAllOrders = async () => {
        axios.get('/api/orders').then(res=>this.setState({orders: res.data}))
    }
    render() {
        let displayOrders = this.state.orders.map((elem,i)=>{
            return <Link key={i} to={`/orders/${elem.id}`}><div >Order:{elem.id}</div>
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
export default Orders