import React, {Component} from 'react'
import axios from 'axios'

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart:[],
            total: null,
            userInput: null
        }
    }
    componentDidMount() {
        axios.get('/api/cart').then(res=> this.setState({cart: res.data.cart, total: res.data.total}))

    }
    render() {
        console.log(this.state.cart)
        let displayCart = this.state.cart.map((item,id)=>{
            return <div key={id}><h5>{item.dish_name}</h5>
            <img width='50px'src={item.img}/>
            <div>Quantity: <input name='userInput' value={item.quantity} 
            onChange={this.handleChange}/></div>
            <button onClick={this.updateCart}>Update</button>
            <button onClick={this.deleteCart}>Delete</button>
            </div>
        })
        
        return(
<div>{displayCart}
<div></div>
</div>
        )
    }
}
export default Cart