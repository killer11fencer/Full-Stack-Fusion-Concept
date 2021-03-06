import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {updateAuthenticated,updateAdmin} from '../../redux/reducer'

class MenuItem extends Component {
    constructor() {
        super();
        this.state = {
            dish: [],
            dish_name: '',
            img: '',
            price: 0,
            description: '',
            category_id: null

        }
    }
    async componentDidMount() {
        const session = await axios.get('/api/session')
        console.log('session data',session.data)
        if(session.data.user) {
            this.props.updateAuthenticated(session.data.user.authenticated)
            this.props.updateAdmin(session.data.user.admin)
        }
        this.showDish();
    }

    showDish = async () => {
       let res = await axios.get(`/api/menu/${this.props.match.params.id}`)
       console.log('SHOW DISH', res.data)
            this.setState({
                dish: res.data,
                dish_name: res.data[0].dish_name,
                img: res.data[0].img,
                price: res.data[0].price,
                description: res.data[0].description,
                category_id: res.data[0].category_id
            })
    }
    addToCart = async (item) => {
        let quantity = 1
        let itemInCart = { ...item, quantity }
        if (this.props.authenticated) {
            axios.post('/api/cart', itemInCart).then(this.props.history.push('/cart'))
        }
        else { this.props.history.push('/login') }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    updateDish = async (id) => {
        const {dish_name,img,price,description,category_id} = this.state
        axios.put(`/api/menu/${id}`,{dish_name,img,price,description,category_id}).then(res=> this.setState({dish:res.data
        }))
        this.showDish()
        this.props.history.push('/menu')
    }
        
    render() {
        
        let dish = this.state.dish.map((elem, id) => {

            return <div key={id}>
             <img alt='food' className='home' src='https://i.kinja-img.com/gawker-media/image/upload/s--djYdkXK4--/c_scale,f_auto,fl_progressive,q_80,w_1600/be9vyovcn2gqwod7kd16.jpg' />
             <div className='menuTitle'></div>
                <h1 className='MenuText'>{elem.name}</h1>
                <div className='MenuCategory'>
                <h2 className='menuDetailDishName'>{elem.dish_name}</h2>
                <img className='itemIMG'name='img' src={elem.img} alt='kimbop' />
                <h2 className='menuDetailPrice'>{`Price: $${elem.price}`}</h2>
                {!this.props.admin && <button className='menuDetailsAdd'onClick={e => this.addToCart(elem)}>Add To Cart</button>}
                <h4 className='itemDescription'>{elem.description}</h4>
                <Link to='/menu'><button className='menuDetailsBack'>Back</button></Link>
                </div>
                {this.props.admin && <div className='UpdateDish'>
                    <div>Dish Name:</div>
                    <input name='dish_name' defaultValue={elem.dish_name} onChange={this.handleChange} />
                    <div>Description</div>
                    <input name='description' defaultValue={elem.description} onChange={this.handleChange} />
                    <div>Image URL</div>
                    <input  defaultValue={elem.img} onChange={this.handleChange} />
                    <div>Price</div>
                    <input name='price' defaultValue={elem.price} onChange={this.handleChange} />
                    <div>Dish Category</div>
                    <select name='category_id' defaultValue={elem.category_id} onChange={this.handleChange}>
                    <option value={elem.category_id} selected>Choose here</option>
                        <option value='1'>Appetizer</option>
                        <option value='2'>Entree</option>
                        <option value="3">Stews</option>
                        <option value="4">Soup</option>
                    </select>
                    <button className='UpdateDishButton'onClick={(e)=>this.updateDish(elem.dish_id)}>Update</button>
  
                </div>}
            </div>
        })
        return (
            <div className='MenuDiv'>
                {dish}
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

function mapStateToProps(state) {
    return {
        authenticated: state.client.authenticated,
        admin: state.client.admin
    }

}


export default connect(mapStateToProps,mapDispatchToProps)(MenuItem)