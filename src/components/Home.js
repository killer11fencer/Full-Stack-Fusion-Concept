import React, {Component} from 'react'

import {Link} from 'react-router-dom'
import axios from 'axios';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        axios.get('/api/posts').then(res=>this.setState({posts: res.data}))
        .catch(err=> console.log('err on posts',err))
    }
    render() {
        console.log('should be posts',this.state)
        let posts = this.state.posts.map((post,id)=>{
            return <div key={id}>
            <div>{post.title}</div>
            <img src={post.img} alt='kimbop'/>
            <div>{post.description}</div>
            <Link to={post.path}><button>{post.button}</button></Link>
            </div>
        })
        return(
            <div>
                {posts}
            </div>
        )
    }
}
export default Home