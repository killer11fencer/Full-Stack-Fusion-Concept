import React, {Component} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            dishes:[],
        }
    }
    componentDidMount() {
        axios.get('/api/menu').then(res=>this.setState({dishes:res.data}))
        .catch(err=>console.log('err on dishes',err))
    }
    
    render(){
        let displayDishes = this.state.dishes.map((elem,id)=>{
            return <Link to={`/menu/food`}><div key={id}><h4>{elem.name}</h4>
            <img src={elem.img} alt='Kimbop'/>
            <div>{elem.price}</div>
            </div></Link>
        })
        return(
<div>
    Menu
    {displayDishes}
</div>
        )
    }
}
export default Menu