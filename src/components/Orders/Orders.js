import React, {Component} from 'react'
import axios from 'axios'

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
    getAllOrders = () => {
        axios.get('/api/orders').then(res=>this.setState({orders: res.data}))
    }
}
export default Orders