import React, { Component } from 'react'
import axios from 'axios'

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
    updateCart= (item) => {
        axios.put(`/api/cart/${item.dish_id}`,item).then(this.getCart())
    }
    deleteCart = (item) => {
        axios.delete(`/api/cart/${item.dish_id}/${item.price}/${item.quantity}`).then(this.getCart())
   console.log(item)


   console.log(`/api/cart/${item.dish_id}/${item.price}/${item.quantity}`)
    }
    render() {
        console.log(this.state.cart)
        let displayCart = this.state.cart.map((item, id) => {
            console.log(item)
            return <div key={id}><h5>{item.dish_name}</h5>
                <img width='50px' src={item.img} />
                <div>Quantity: <input onChange={this.handleChange} name='userInput' placeholder={item.quantity}
                     /></div>
                <button onClick={(e)=>this.updateCart(item)}>Update</button>
                
                <button onClick={(e)=>this.deleteCart(item)}>Delete</button>
            </div>
        })

        return (
            <div>{displayCart}
                <div>Total: ${this.state.total}</div>
                <button>Submit</button>
                <button>Cancel</button>
            </div>
        )
    }
}
export default Cart