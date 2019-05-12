require('dotenv').config()
const massive = require('massive')
const express = require('express')
const session = require('express-session')
const ctrl = require('./controller/ctrl')
const cartCtrl = require('./controller/cartCtrl')
const orderCtrl = require('./controller/orderCtrl')
const dishCtrl = require('./controller/dishCtrl')

const {CONNECTION_STRING,SERVER_PORT,SESSION_SECRET,STRIPE_API} = process.env
const stripe = require('stripe')(STRIPE_API);
const app = express()



app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use((req,res,next) => {
    const {session} = req
    if(!session.cart) {
        session.cart = {username:'',cart:[],total:0}
    }
    next();
}
)


massive(CONNECTION_STRING).then(db=>{
    app.set('db',db)
    console.log('database set')
    console.log(db.listTables())
 
    app.listen(SERVER_PORT,()=>console.log('listening on port',SERVER_PORT))}).catch(err=>console.log('err connection',err))

// Home Page
app.get('/api/posts',ctrl.getAllPosts)
app.post('/api/posts',ctrl.addPosts)
// Menu Sytem
app.get('/api/menu',ctrl.getAllDishes)
app.get('/api/menu/:id',ctrl.getOneDish)
// Register and Log on Users
app.post('/auth/register',ctrl.register)
app.post('/auth/login', ctrl.login)
app.get('/auth/logout',ctrl.logOut)
//Cart on Sessions
app.get('/api/cart',cartCtrl.getCart)
app.post('/api/cart',cartCtrl.add)
app.delete('/api/cart/:dish_id/:price/:quantity',cartCtrl.remove)
app.put('/api/cart/:id',cartCtrl.update)
app.post('/api/orders',cartCtrl.createOrder)
// Orders
app.get('/api/orders',orderCtrl.getOrders)
app.get('/api/orders/:id',orderCtrl.orderDetails)

//Stripe
app.post('/charge', async (req,res)=>{
    const {total,token} = req.body 
   
    try {
        let {status} = await stripe.charges.create({
            amount:total,
            currency: 'usd',
            description: 'Fusion-Asian',
            source: token
        });
    
        res.sendStatus(200)
    } catch (err) {
        res.status(500).end();
    }
});

//admin functions
//dishes
app.delete('/api/menu/:id',dishCtrl.deleteDish)