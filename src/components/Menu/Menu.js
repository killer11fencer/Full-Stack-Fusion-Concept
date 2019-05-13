import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import {connect} from 'react-redux'
import {cancelOrder} from '../../redux/adminReducer'

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            dishes: [],
            
        }
    }
    componentDidMount() {
        this.getAllDishes()
    }
    //client functions
    getAllDishes = () => {
        axios.get('/api/menu').then(res => this.setState({ dishes: res.data }))
            .catch(err => console.log('err on dishes', err))
    }
    //admin functions
    deleteDish = async (id) => {
        axios.delete(`/api/menu/${id}`).then(res=>this.setState({dishes: res.data}))
        .catch(err=>console.log('err deleting',err))
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
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        }
        let appetizers = this.state.dishes.map((elem, id) => {
            if (elem.name === "Appetizers") {
                return <div key={id}><Link  to={`/menu/${elem.dish_id}`}>
                    <h4>{elem.dish_name}</h4>
                    <img width='100' src={elem.img} alt='Kimbop' />
                    <h5>{elem.price}</h5>
                </Link>
                {this.props.admin && !this.props.user &&<button onClick={(e)=>this.deleteDish(elem.dish_id)}>Delete</button>}
                {this.props.user && <button onClick={(e)=> this.addToCart(elem)}>Add To Cart</button>}</div>
            }
        }
        )
        let Entree = this.state.dishes.map((elem, id) => {
            if (elem.name === "Entrees") {
                return <div key={id}><Link to={`/menu/${elem.dish_id}`}>
                    <h4>{elem.dish_name}</h4>
                    <img width='100' src={elem.img} alt='Kimbop' />
                    <h5>{elem.price}</h5>
                </Link>{this.props.admin && !this.props.user && <button onClick={(e)=>this.deleteDish(elem.dish_id)}>Delete</button>}
                {this.props.user && <button onClick={(e)=> this.addToCart(elem)}>Add To Cart</button>}</div>
            }
        }
        )
        return (
            <div>
                Menu
                {this.props.admin && !this.props.user && <Link to='/addnew'>Add Dish</Link>}
                {this.props.admin && this.props.user && <button onClick={this.cancelOrder}>Cancel Order</button>}
    <Slider {...settings}>
                    <div>Appetizers:{appetizers}</div>
                    <div>Entree: {Entree}</div>
                </Slider>

            </div>
        )
    }
}
const mapDispatchToProps = {
    cancelOrder
}
function mapStateToProps (state) {
    return {admin:state.client.admin,
            user:state.admin.user}
}
    export default connect(mapStateToProps,mapDispatchToProps)(Menu)