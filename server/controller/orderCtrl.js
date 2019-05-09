module.exports = {
    getOrders: (req,res) => {
        const db = app.get('db')
        let {user} = req.session
        let id = user.id
        
        db.getAllOrders({id}).then(result=>res.status(200).send(result))
    }
}