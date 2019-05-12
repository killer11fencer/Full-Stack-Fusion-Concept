import React, {Component} from 'react'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
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
    axios.get('/api/posts').then(res=>this.setState({posts: res.data}))
        .catch(err=> console.log('err on posts',err))
}

    onSubmit = async (e) => {
        const {title,description,img,path,button} = this.state
        axios.post('/api/posts',{title,description,img,path,button}).then(res=>this.setState({posts: res.data}))
        .catch(err=>console.log('err on creating post',err))
        this.getPosts()
    }
    render() {
        const settings = {
            dots: true,
            infinite:true,
            speed:500,
            slidesToShow: 1,
            slidesToScroll: 1
        }
        console.log('should be posts',this.state.posts)
        console.log('admin',this.props.admin)
        
     
        const posts = this.state.posts.map((post,id)=>{
            return <div key={id}> 
            <h4>{post.title}</h4>
            <img height='400' src={post.img} alt={post.title}/>
            <h5>{post.description}</h5>
            <Link to={post.path}>{post.button}</Link>
            </div>
        })
        return(
            <div>
                <div className='slider'>
                <Slider {...settings}>
                {posts}
                </Slider>
                <footer><h5>Fusion Asian</h5>
                <h6>Address: 1469 Center st, Provo,UT 84660</h6>
                <h6>Phone: 805 611 91121</h6>
                </footer>
                </div>
                {this.props.admin && <div>
                    <h3>Update Posts</h3>
                <div>Title</div>
                <input name='title'onChange={this.handleChange}/>
                <div>Description</div>
                <input name='description' onChange={this.handleChange}/>
                <div>Image</div>
                <input name='img' onChange={this.handleChange}/>
                <div>Link to</div>
                <input name='path' onChange={this.handleChange}/>
                <div>Button</div>
                <input name='button' onChange={this.handleChange}/>
                <button onClick={this.onSubmit}>Submit New Posts</button>
                </div>
                }
            </div>
        )
    }
}
function mapStateToProps (state) {
    return {
        admin: state.admin
    }
}
export default connect(mapStateToProps)(Home)
