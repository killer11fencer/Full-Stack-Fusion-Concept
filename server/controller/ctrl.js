const bcrypt = require('bcryptjs')
module.exports = {
    getAllPosts: async (req,res) => {
        const db = req.app.get('db')
        db.getAllPosts().then(result=>res.status(200).send(result))
        .catch(err=>console.log('err on posts',err))
    },
    addPosts: async (req,res) => {
        const db = req.app.get('db')
        const {title,description,img,path,button} = req.body
        db.addPosts({title,description,img,path,button}).then(result=>res.status(200).send(result))
        .catch(err=> console.log('err on adding posts',err))
    },
    getAllDishes: async (req,res) => {
        const db = req.app.get('db')
        db.getAllDishes().then(result=>res.status(200).send(result))
        .catch(err=>console.log('err on get dishes',err))

    },
    getOneDish: async (req,res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.getOneDish({id}).then(result=>res.status(200).send(result))
        .catch(err=>console.log('err on getOne',err))
    },
    addDish: async (req,res) => {
        const db = req.app.get('db')
        const {name,description,img,price,category_id} = req.body
        db.addDish({name,description,img,price,category_id}).then(result=>res.status(200).send(result))
        .catch(err=>console.log('err on adding dish',err))
    },
    register: async (req,res) => {
        const db = req.app.get('db')
        const {email,first_name,last_name,username,password,phone} = req.body
        const {session} = req
        let emailTaken = await db.checkEmail({email})
        emailTaken = +emailTaken[0].count
     
        if(emailTaken !== 0) { return res.sendStatus(409)}
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)
        const user_id = await db.registerUser({
            email,
            first_name,
            last_name,
            username,
            hash,
            phone
        })
        session.user = {
            username,
            first_name,
            
            
        }
       
        res.sendStatus(200)
    },
login: async (req,res) => {
    const db = req.app.get('db')
    const {loginUsername:username} = req.body
    const {session} = req
    try {
    let user = await db.login({username})
    
    session.user = user[0]
    const authenticated = bcrypt.compareSync(req.body.loginPassword,user[0].password)
   
    if(authenticated){ console.log(session)
        res.status(200).send({authenticated,id: user[0].id,admin: user[0].admin})
    } else { throw new Error(401,'Error')} 
}catch(err) {res.sendStatus(401)}
},
logOut: (req,res) => {
    req.session.destroy()
    res.sendStatus(200)
}



}