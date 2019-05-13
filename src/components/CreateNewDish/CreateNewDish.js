import React, {Component} from 'react'
import axios from 'axios'


class CreateNewDish extends Component {
    constructor() {
        super();
        this.state = {
            dish_name: '',
            description: '',
            img: '',
            price: null,
            category_id: null
        }
    }
    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }
    addDish = () => {
        const {dish_name,description,img,price,category_id} = this.state
        axios.post('/api/menu',{name:dish_name,description,img,price,category_id}).then(res=> res.sendStatus(200))
        this.props.history.push('/menu')
    }
    cancelAddition = () => {
        this.setState({dish_name: '',
        description: '',
        img: '',
        price: null,
        category_id: null})
        this.props.history.push('/menu')
    }
    render() {
        console.log(this.state)
        return(
            <div>
                 <div>Dish Name:</div>
                    <input name='dish_name' placeholder='Dish Name' onChange={this.handleChange} />
                    <div>Description</div>
                    <input name='description' placeholder='Description'onChange={this.handleChange} />
                    <div>Image URL</div>
                    <input name='img' placeholder='Image URL' onChange={this.handleChange} />
                    <div>Price</div>
                    <input name='price' placeholder='Price' onChange={this.handleChange} />
                    <div>Dish Category</div>
                    <select name='category_id' onChange={this.handleChange}>
                    <option selected>Choose here</option>
                        <option value='1'>Appetizer</option>
                        <option value='2'>Entree</option>
                        <option value="3">Stews</option>
                        <option value="4">Soup</option>
                    </select>
                    <button onClick={this.addDish}>Add New Dish</button>
                    <button onClick={this.cancelAddition}>Cancel</button>
            </div>
        )
    }
}
export default CreateNewDish