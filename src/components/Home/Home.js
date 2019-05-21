import React, { Component } from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';
import {updateAuthenticated,updateAdmin} from '../../redux/reducer'

class Home extends Component {
    constructor() {
        super();
        this.state = {
            posts: [{}],
            img: '',
            title: '',
            description: '',
            path: '',
            button: ''
        }
    }
    async componentDidMount() {
        const session = await axios.get('/api/session')
        console.log('session data',session.data)
        if(session.data.user) {
            this.props.updateAuthenticated(session.data.user.authenticated)
            this.props.updateAdmin(session.data.user.admin)
        }
        await this.getPosts()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    getPosts = () => {
        axios.get('/api/posts').then(res => this.setState({ posts: res.data }))
            .catch(err => console.log('err on posts', err))
    }

    onSubmit = async (e) => {
        const { title, description, img, path, button } = this.state
       await axios.post('/api/posts', { title, description, img, path, button }).then(res => this.setState({ posts: res.data }))
            .catch(err => console.log('err on creating post', err))
        this.getPosts()
        this.setState({img: '',
        title: '',
        description: '',
        path: '',
        button: ''})
    }
    render() {
        const settings = {
            arrows: true,
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            className: 'Posts'
        }
        console.log('CHECKING PATH',this.state.path)
        const posts = this.state.posts.map((post, id) => {
            return <div className='dishes' key={id}>
                <h1 >{post.title}</h1>
                <div className='content'>
                <img className='postImage' src={post.img} alt={post.title} />
                <div className='text'>
                <h5 className='description'>{post.description}</h5>
                <Link to={post.path}><button className='postButton'>{post.button}</button></Link>
                </div>
                </div>
            </div>
        })

        
        return (
            <>
                <div className='menuTitle'></div>
                <img alt='cooking background' className='home' src='https://www.rosewoodhotels.com/conversations/conversations/wp-content/uploads/2017/04/GettyImages-621141664.jpg' />
                
                {this.state.posts.length > 0 ? <div className='ResponseView'><h1 className='contentTitle' >{this.state.posts[0].title}</h1>
                <div className='content'>
                <img className='postImage' src={this.state.posts[0].img} alt={this.state.posts[0].title} />
                <div className='text'>
                <h5 className='description'>{this.state.posts[0].description}</h5>
                <Link to={this.state.posts[0].path}><button className='postButton'>{this.state.posts[0].button}</button></Link>
                </div>
                </div></div> : <div></div>}
                <div className='slider'>
                    <Slider {...settings}>
                        {posts}
                    </Slider>
                    
                  
                </div>

             


                {this.props.admin && <div className='adminUpdate'>
                <div className='adminInputs'>
                    <h3>Update Posts</h3>
                    <div>Title</div>
                    <input className='update' value={this.state.title} name='title' onChange={this.handleChange} />
                    <div>Description</div>
                    <input className='update' value={this.state.description}name='description' onChange={this.handleChange} />
                    <div>Image</div>
                    <input className='update' value={this.state.img} name='img' onChange={this.handleChange} />
                    <div>Link to</div>
                    <select name='path' onChange={this.handleChange}>
                    <option  value=''>Choose a link </option>
                        <option  value={'/about'}>About</option>
                        <option  value={'/menu'}>Menu</option>
                        <option  value={'/login'}>Login</option>
                        <option  value={'/register'}>Register</option>
                        </select>
                    <div>Button</div>
                    <input className='update' value={this.state.button} name='button' onChange={this.handleChange} />
                    <button className='updateButton' onClick={this.onSubmit}>Submit New Posts</button>
                    </div>
                </div>
                }
                   <div className='address'>
                    <div>Fusion Asian</div>
                    <div>Address: 1469 Center st, <br /> Provo,UT 84660</div>
                    <div>Phone: 805 611 91121</div>
                </div>
            </>
        )
    }
}
const mapDispatchToProps = {
    updateAuthenticated,
    updateAdmin
}
function mapStateToProps(state) {
    return {
        admin: state.client.admin
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)
