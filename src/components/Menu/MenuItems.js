import React, {Component} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class MenuItem extends Component {
    constructor() {
        super();
        this.state = {
            dish:[],
            
        }
    }
    componentDidMount() {
         this.showDish();
    }

    showDish = async () => {
        await axios.get(`/api/menu/${this.props.match.params.id}`).then(res=> this.setState({dish:res.data}))
        .catch(err=>console.log('err on get one',err))
    }
    addToCart = async (item) => {
        let quantity = 1
        let itemInCart = {...item,quantity}
        if(this.props.authenticated) {
        axios.post('/api/cart',itemInCart).then(this.props.history.push('/cart'))
        }
        else {this.props.history.push('/login')}
    }
    render() {
     let dish = this.state.dish.map((elem,id)=> {
         
         return <div key={id}>
        <h3>{elem.name}</h3>
         <h3>{elem.dish_name}</h3>
         <img width='200'src={elem.img} alt='kimbop'/>
         <h4>{`Price: $${elem.price}`}</h4>
         <button onClick={e=>this.addToCart(elem)}>Add To Cart</button>
         <h4>{elem.description}</h4>
         <Link to='/menu'>Back</Link>
         <Link to={`/menu/${elem.dish_id + 1}`}>Next</Link>
         </div> 
     })
        return(
            <div>
               {dish}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {authenticated: state.authenticated}

}


export default connect(mapStateToProps)(MenuItem)