import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {updateAuthenticated,updateAdmin} from '../../redux/reducer'
import {connect} from 'react-redux'



class OrderDetails extends Component {
    constructor() {
        super();
        this.state = {
            orderDetails: [],
           
        }
    }
    async componentDidMount() {
        const session = await axios.get('/api/session')
        console.log('session data',session.data)
        if(session.data.user) {
            this.props.updateAuthenticated(session.data.user.authenticated)
            this.props.updateAdmin(session.data.user.admin)
        }
        this.orderDetails()
    }
    orderDetails = async () => {
        await axios.get(`/api/orders/${this.props.match.params.id}`).then(res => this.setState({ orderDetails: res.data }))
            .catch(err => console.log('err on get one', err))
    }
  
    render() {
        console.log(this.state.orderDetails)
     
        let orderTotal = this.state.orderDetails.map(item=> item.quantity * item.dish_price).reduce(((acc,val)=>acc+val), 0)
        let displayOrderDetails = this.state.orderDetails.map((elem, i) => { 
            return <div key={i}><h3>Dishes: {elem.dish_name} </h3>
            <h4>Quantity: {elem.quantity}</h4>
            <h4>Price: ${elem.dish_price}</h4>
            
            </div>})
        return (
            <div className='MenuDiv'>
                <img alt='background of food'className='home' src='https://thepioneerwoman.com/wp-content/uploads/2018/09/5-easy-korean-side-dishes-banchan-ebb098ecb0ac-33.jpg'/>
                <div className='menuTitle'></div>
               <h1 className='MenuText'>Order {this.props.match.params.id} Details:</h1>
                
            <div className='orders'>{displayOrderDetails}</div>
            <div className='orderTotal' ><h1>Total: ${orderTotal}</h1></div>
            <Link to='/orders'><button className='back'>Back</button></Link>
            <div className='address'>
                    <div>Fusion Asian</div>
                    <div>Address: 1469 Center st, <br /> Provo,UT 84660</div>
                    <div>Phone: 805 611 91121</div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = {
    updateAuthenticated,
    updateAdmin
   }

export default connect(null,mapDispatchToProps)(OrderDetails)