import React, {Component} from 'react'
import axios from 'axios';

class MenuItem extends Component {
    constructor() {
        super();
        this.state = {
            dish:[]
        }
    }
    componentDidMount() {
         this.showDish();
    }

    showDish = async () => {
        await axios.get(`/api/menu/${this.props.match.params.id}`).then(res=> this.setState({dish:res.data}))
        .catch(err=>console.log('err on get one',err))
    }
    render() {
     let dish = this.state.dish.map((elem,id)=> {
         return <div key={id}>
         <h3>{elem.name}</h3>
         <img width='200'src={elem.img} alt='kimbop'/>
         <h4>{`Price: $${elem.price}`}</h4>
         <button>Add To Cart</button>
         <h4>{elem.description}</h4>
         </div> 
     })
        return(
            <div>
               {dish}
            </div>
        )
    }
}
    


export default MenuItem