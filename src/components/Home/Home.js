import React, { Component } from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';

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
    componentDidMount() {
        this.getPosts()
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
        axios.post('/api/posts', { title, description, img, path, button }).then(res => this.setState({ posts: res.data }))
            .catch(err => console.log('err on creating post', err))
        this.getPosts()
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



        const posts = this.state.posts.map((post, id) => {
            return <div key={id}>
                <h1>{post.title}</h1>
                <div className='content'>
                <img className='postImage' src={post.img} alt={post.title} />
                <div className='text'>
                <h5 className='description'>{post.description}</h5>
                <Link to={post.path}>{post.button}</Link>
                </div>
                </div>
            </div>
        })
        return (
            <div>
                <img alt='cooking background' className='home' src='https://www.rosewoodhotels.com/conversations/conversations/wp-content/uploads/2017/04/GettyImages-621141664.jpg' />
                <div className='white'></div>
                <div className='slider'>
                    <Slider {...settings}>
                        {posts}
                    </Slider>
                </div>

                <div className='address'>
                    <div>Fusion Asian</div>
                    <div>Address: 1469 Center st, <br /> Provo,UT 84660</div>
                    <div>Phone: 805 611 91121</div>
                </div>


                {this.props.admin && <div>
                    <h3>Update Posts</h3>
                    <div>Title</div>
                    <input name='title' onChange={this.handleChange} />
                    <div>Description</div>
                    <input name='description' onChange={this.handleChange} />
                    <div>Image</div>
                    <input name='img' onChange={this.handleChange} />
                    <div>Link to</div>
                    <input name='path' onChange={this.handleChange} />
                    <div>Button</div>
                    <input name='button' onChange={this.handleChange} />
                    <button onClick={this.onSubmit}>Submit New Posts</button>
                </div>
                }
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        admin: state.client.admin
    }
}
export default connect(mapStateToProps)(Home)
