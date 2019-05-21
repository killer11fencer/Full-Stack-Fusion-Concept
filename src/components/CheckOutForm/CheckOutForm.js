import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'

class CheckOutForm extends Component {
    constructor(props) {
        super(props);
            this.submit = this.submit.bind(this)
    }
    async submit(ev) {
        let {token} = await this.props.stripe.createToken({name:'name'})
        if(token) {
        let total = +this.props.total * 100
        let body = {total,token: token.id}
      console.log(body)
        let response = await axios.post('/charge',body)
        
        if(response.status === 200) {
            console.log('Purchase Complete')
            this.props.createOrder(this.props.cart)
        }
        }
        return console.log('Please try again')
    }
    render() {
        return(
            <div className='checkout'>
            <p> Would you like to complete the purchase?</p>
            <CardElement/>
            <button className='placeOrder' onClick={this.submit}>Place Order</button>
            </div>
        )
    }
}
export default injectStripe(CheckOutForm);