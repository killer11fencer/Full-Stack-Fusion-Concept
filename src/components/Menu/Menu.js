import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { connect } from 'react-redux'
import { cancelOrder } from '../../redux/adminReducer'
import {updateAuthenticated,updateAdmin} from '../../redux/reducer'

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            dishes: [],

        }
    }
    async componentDidMount() {
        const session = await axios.get('/api/session')
        console.log('session data',session.data)
        if(session.data.user) {
            this.props.updateAuthenticated(session.data.user.authenticated)
            this.props.updateAdmin(session.data.user.admin)
        }
        this.getAllDishes()
    }
    //client functions
    getAllDishes = () => {
        axios.get('/api/menu').then(res => this.setState({ dishes: res.data }))
            .catch(err => console.log('err on dishes', err))
    }
    //admin functions
    deleteDish = async (id) => {
        axios.delete(`/api/menu/${id}`).then(res => this.setState({ dishes: res.data }))
            .catch(err => console.log('err deleting', err))
        this.getAllDishes()
    }
    addToCart = async (item) => {
        let quantity = 1
        let itemInCart = { ...item, quantity }
        axios.post('/api/cart', itemInCart).then(this.props.history.push('/cart'))
    }
    cancelOrder = () => {
        this.props.cancelOrder()

    }
    render() {
        console.log(this.state)
        const settings = {
            arrows: true,
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            className: 'Menu'

        }
        let appetizers = this.state.dishes.map((elem, id) => {
            if (elem.name === "Appetizers") {
                return <div className='dishes' key={id}><Link to={`/menu/${elem.dish_id}`}>
                    <h4>{elem.dish_name}</h4>
                    <img className='menuImg' src={elem.img} alt='Kimbop' />
                    <h5>Price: {elem.price}</h5>
                </Link>
                    {this.props.admin && !this.props.user && <button className='deleteDish' onClick={(e) => this.deleteDish(elem.dish_id)}>Delete</button>}
                    {this.props.user && <button className='addCartButton' onClick={(e) => this.addToCart(elem)}>Add To Cart</button>}</div>
            }
            return console.log('loading')
        }
        )
        let Entree = this.state.dishes.map((elem, id) => {
            if (elem.name === "Entrees") {
                return <div className='dishes' key={id}><Link to={`/menu/${elem.dish_id}`}>
                    <h4>{elem.dish_name}</h4>
                    <img className='menuImg' src={elem.img} alt='Kimbop' />
                    <h5> Price: {elem.price}</h5>
                </Link>{this.props.admin && !this.props.user && <button className='deleteDish' onClick={(e) => this.deleteDish(elem.dish_id)}>Delete</button>}
                    {this.props.user && <button className='addCartButton' onClick={(e) => this.addToCart(elem)}>Add To Cart</button>}</div>
            }
            return console.log('loading')
        }
        )
        return (
            <div className='MenuDiv'>
                <img alt='food' className='home' src='https://i.kinja-img.com/gawker-media/image/upload/s--djYdkXK4--/c_scale,f_auto,fl_progressive,q_80,w_1600/be9vyovcn2gqwod7kd16.jpg' />
                {this.props.admin && !this.props.user && <Link to='/addnew'><button className='addNewDish'>Add Dish</button></Link>}
                {this.props.admin && this.props.user && <button onClick={this.cancelOrder}>Cancel Order</button>}
                <div className='menuTitle'></div>
                <h1 className='MenuText'>Menu</h1>
                <div className='MenuSlider'>
                    <Slider {...settings}>
                        <div className='category'><h1 className='categoryName'>Appetizers:</h1>{appetizers}</div>
                        <div className='category'><h1 className='categoryName'>Entree:</h1> {Entree}</div>
                    </Slider>
                </div>

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
    cancelOrder,
    updateAuthenticated,
    updateAdmin
}
function mapStateToProps(state) {
    return {
        admin: state.client.admin,
        user: state.admin.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu)