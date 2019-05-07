import React, {Component} from 'react'
import axios from 'axios';

class MenuItem extends Component {
    constructor() {
        super();
        this.state = {
            dish:{},
        }
    }
    componentDidMount() {
        axios.get(`/api/menu/${this.props.match.params.id}`).then(res=> this.setState({dish:res.data}))
        .catch(err=>console.log('err on get one',err))
    }
    render() {
      let {dish} = this.state
        return(
            <div>
               <h3>{dish.name}</h3>
               <img width='200'src={dish.img}/>
               <h4>{`Price: $${dish.price}`}</h4>
               <button>Add To Cart</button>
            </div>
        )
    }
}
    


export default MenuItem