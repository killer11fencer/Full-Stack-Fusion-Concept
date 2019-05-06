import React, {Component} from 'react'
import Navbar from './Navbar'

class Home extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }
    render() {
        return(
            <div>
                  <Navbar/>
            </div>
        )
    }
}
export default Home