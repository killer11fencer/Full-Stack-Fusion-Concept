import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Slider from 'react-slick'


class Menu extends Component {
    constructor() {
        super();
        this.state = {
            dishes: [],
            
        }
    }
    componentDidMount() {
        axios.get('/api/menu').then(res => this.setState({ dishes: res.data }))
            .catch(err => console.log('err on dishes', err))
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
                return <Link key={id} to={`/menu/${elem.dish_id}`}>
                    <h4>{elem.dish_name}</h4>
                    <img width='100' src={elem.img} alt='Kimbop' />
                    <h5>{elem.price}</h5>
                </Link>
            }
        }
        )
        let Entree = this.state.dishes.map((elem, id) => {
            if (elem.name === "Entree") {
                return <Link key={id} to={`/menu/${elem.dish_id}`}>
                    <h4>{elem.dish_name}</h4>
                    <img width='100' src={elem.img} alt='Kimbop' />
                    <h5>{elem.price}</h5>
                </Link>
            }
        }
        )
        return (
            <div>
                Menu
    <Slider {...settings}>
                    <div>Appetizers:{appetizers}</div>
                    <div>Entree: {Entree}</div>
                </Slider>

            </div>
        )
    }
}
    export default Menu