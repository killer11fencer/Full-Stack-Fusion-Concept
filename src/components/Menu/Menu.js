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
        let dishes = this.state.dishes.map((elem,id)=>{
            
            return <Link key={id} to={`/menu/${elem.id}`}>
            <h4>{elem.name}</h4>
            <img width='200' src={elem.img} alt='Kimbop'/>
            <div>{elem.price}</div>
            </Link>
        })
        return(
<div>
    Menu
    {dishes}
</div>
        )
    }
}
export default Menu