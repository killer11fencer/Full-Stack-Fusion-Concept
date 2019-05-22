import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateAuthenticated,updateAdmin} from '../../redux/reducer'

class CreateNewDish extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            img: '',
            price: null,
            category_id: null
        }
    }
    async componentDidMount () {
        const session = await axios.get('/api/session')
        console.log('session data',session.data)
        if(session.data.user) {
            this.props.updateAuthenticated(session.data.user.authenticated)
            this.props.updateAdmin(session.data.user.admin)
        }
    }
    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }
    addDish = () => {
        const {name,description,img,price,category_id} = this.state
        
        axios.post('/api/menu',{name,description,img,price,category_id})
        this.props.history.push('/menu')
    }
    cancelAddition = () => {
        this.setState({name: '',
        description: '',
        img: '',
        price: null,
        category_id: null})
        this.props.history.push('/menu')
    }
    render() {
        console.log(this.state)
        return(
            <div className='createDish'>
                 <div>Dish Name:</div>
                    <input name='name' placeholder='Dish Name' onChange={this.handleChange} />
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
                    <button className='AddNewDish'onClick={this.addDish}>Add New Dish</button>
                    <button className='CancelNewDish'onClick={this.cancelAddition}>Cancel</button>
            </div>
        )
    }
}
const mapDispatchToProps = {
    updateAuthenticated,
    updateAdmin
}
export default connect(null,mapDispatchToProps)(CreateNewDish)