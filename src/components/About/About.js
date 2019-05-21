import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {updateAuthenticated,updateAdmin} from '../../redux/reducer'


class About extends Component {

   async componentDidMount () {
    const session = await axios.get('/api/session')
    console.log('session data',session.data)
    if(session.data.user) {
        this.props.updateAuthenticated(session.data.user.authenticated)
        this.props.updateAdmin(session.data.user.admin)
    }
    }
    render () {
        return (
            <div className='AboutContainer'>
            <img alt='store' className='home' src='https://3.bp.blogspot.com/-BFiKOGPTDq0/V4O56KIPqbI/AAAAAAAAMXc/p0_u66g6pzcXb744p3co7cZPO-l14PPRgCKgB/s1600/2.jpg'/>
            <div className='aboutContent'>
            <div className='about'>
            <h2>Store Hours</h2>
            <div>Call (801) 491–219</div>
            <div>Mon - Sat</div>      
            <div>Lunch  11am - 3pm</div>      
            <div>Dinner 5pm – 9pm  </div> 
            <h2>Address</h2>  
            <div>Address: 1469 Center st, <br /> Provo,UT 84660</div> 
            <div>Phone: 805 611 91121</div>
            </div>
            <div className='about'>
            <h1>About Fusion Asian</h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ipsam, voluptatem debitis doloribus minus rerum ipsa facere nihil. Consectetur doloribus saepe dolores molestias, beatae voluptates a illum ipsam magnam quaerat?
            </div>
            </div>
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

export default connect(null,mapDispatchToProps)(About)