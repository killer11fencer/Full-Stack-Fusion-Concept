import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            total: 0,
            userInput: 0
        }
    }
    componentDidMount() {
        this.getCart()

    }
    getCart =()=>{
        axios.get('/api/cart').then(res => this.setState({ cart: res.data.cart, total: res.data.total }))
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    updateCart = (index, quantity) => {
        let cart = this.state.cart
        cart[index].quantity = quantity
        let updatedCart = cart[index]
        axios.put(`/api/cart/${updatedCart.dish_id}`,updatedCart).then(this.getCart())
        
    }
    deleteCart = (item) => {
        axios.delete(`/api/cart/${item.dish_id}/${item.price}/${item.quantity}`).then(this.getCart())
    }
    createOrder = (order) => {
        axios.post('/api/orders',order).then(this.getCart())
    }

    render() {
        console.log(this.state.cart)
       
        let displayCart = this.state.cart.map((item, index) => {
            return <div key={index}><h5>{item.dish_name}</h5>
                <img width='50px' src={item.img} />
                <div>Quantity: <input onChange={this.handleChange} name='userInput' placeholder={item.quantity}
                     /></div>
                <button onClick={(e)=>this.updateCart(index,this.state.userInput)}>Update</button>
                
                <button onClick={(e)=>this.deleteCart(item)}>Delete</button>
            </div>
        })

        return (
            <div>{displayCart}
                <div>Total: ${this.state.total}</div>
                <button onClick={(e)=>this.createOrder(this.state.cart)}>Submit</button>
                <Link to='/menu'><button>Cancel</button></Link>
            </div>
        )
    }
}
export default Cart