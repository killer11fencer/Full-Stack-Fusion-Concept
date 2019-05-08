require('dotenv').config()
const massive = require('massive')
const express = require('express')
const session = require('express-session')
const ctrl = require('./controller/ctrl')
const cartCtrl = require('./controller/cartCtrl')
const app = express()
const {CONNECTION_STRING,SERVER_PORT,SESSION_SECRET} = process.env



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

app.get('/api/posts',ctrl.getAllPosts)
app.get('/api/menu',ctrl.getAllDishes)
app.get('/api/menu/:id',ctrl.getOneDish)
app.post('/auth/register',ctrl.register)
app.post('/auth/login', ctrl.login)
app.get('/auth/logout',ctrl.logOut)
app.post('/api/cart/:id',cartCtrl.add)