import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Elements,StripeProvider} from 'react-stripe-elements'
import {connect} from 'react-redux'
import CheckOutForm from '../CheckOutForm/CheckOutForm'
import {cancelOrder} from '../../redux/adminReducer'
import Popup from 'reactjs-popup'


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
    createOrder = async (order) => {
        axios.post('/api/orders',order).then(this.getCart())
        this.props.history.push('/orders')
        
    }
    createAdminOrder = async () => {
        const {cart} = this.state
        const users_id = this.props.adminOrder_id
        axios.post('/api/admin',{cart,users_id}).then(this.getCart())
        this.props.cancelOrder()
        this.props.history.push('/orders')
    }
    
    render() {
        let apikey = 'pk_test_QWjXZ8OXgnOfLqfw5I7I6WxS00yduxeF4w'
        console.log(this.state.cart)
       
        let displayCart = this.state.cart.map((item, index) => {
            return <div key={index}><h5>{item.dish_name}</h5>
                <img width='50px' alt='food'src={item.img} />
                <div>Quantity: <input onChange={this.handleChange} name='userInput' placeholder={item.quantity}
                     /></div>
                <button onClick={(e)=>this.updateCart(index,this.state.userInput)}>Update</button>
                
                <button onClick={(e)=>this.deleteCart(item)}>Delete</button>
            </div>
        })

        return (
            <StripeProvider apiKey={apikey}>
            <div>{displayCart}
                <div>Total: ${this.state.total}</div>
                {this.props.admin && this.props.user && <button onClick={(e)=>this.createAdminOrder()}>Submit Order</button>}
                {!this.props.admin && <Popup className='modal' trigger={<button>Submit</button>} position='right'>
                <Elements>
                <CheckOutForm cart={this.state.cart} createOrder={this.createOrder} total={this.state.total}/>
                </Elements>
                </Popup>}
                <Link to='/menu'><button>Cancel</button></Link>
                
            </div>
            </StripeProvider>
        )
    }
}
const mapDispatchToProps = {
    cancelOrder
}

function mapStateToProps (state) {
    return {admin: state.client.admin,
            adminOrder_id: state.admin.adminOrder_id,
            user: state.admin.user
            }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)