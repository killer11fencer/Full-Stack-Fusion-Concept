import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class OrderDetails extends Component {
    constructor() {
        super();
        this.state = {
            orderDetails: []
        }
    }
    componentDidMount() {
        this.orderDetails()
    }
    orderDetails = async () => {
        await axios.get(`/api/orders/${this.props.match.params.id}`).then(res => this.setState({ orderDetails: res.data }))
            .catch(err => console.log('err on get one', err))
    }
    render() {
        let orderTotal = this.state.orderDetails.map(item=> item.quantity * item.dish_price).reduce(((acc,val)=>acc+val), 0)
        let displayOrderDetails = this.state.orderDetails.map((elem, i) => { 
            return <div key={i}><h6>Dishes: {elem.dish_name} </h6>
            <h6>Quantity: {elem.quantity}</h6>
            <h6>Price: {elem.dish_price}</h6>
            </div>})
        return (
            <div>
            <div>Order Details:{displayOrderDetails}</div>
            <div>Total:{orderTotal}</div>
            <Link to='/orders'><button>Back</button></Link>
            </div>
        )
    }
}
export default OrderDetails