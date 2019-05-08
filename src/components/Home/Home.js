import React, {Component} from 'react'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import axios from 'axios';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            posts: [{}]
        }
    }
    componentDidMount() {
        axios.get('/api/posts').then(res=>this.setState({posts: res.data}))
        .catch(err=> console.log('err on posts',err))
    }
    render() {
        const settings = {
            dots: true,
            infinite:true,
            speed:500,
            slidesToShow: 1,
            slidesToScroll: 1
        }
        console.log('should be posts',this.state)
     
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
            </div>
        )
    }
}
export default Home