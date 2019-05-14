module.exports = {
    getOrders: (req,res) => {
        const db = req.app.get('db')
        let {user} = req.session
        let id = user.id
        
        db.getAllOrders({id}).then(result=>res.status(200).send(result))
    },
    getAllOrdersAdmin: (req,res) => {
        const db = req.app.get('db')
        db.getAllOrdersAdmin().then(result=>res.status(200).send(result))
    },
    updateOrderAdmin: (req,res) => {
        const db = req.app.get('db')
        let {id} = req.params
        let {status,notes} = req.body
        db.updateOrderAdmin({id,status,notes}).then(result=>res.status(200).send(result))
    },
    orderDetails : async (req,res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.orderDetails(id).then(result=>res.status(200).send(result))
        .catch(err=>console.log('err on one order',err))
    },
    deleteOrder: async (req,res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.deleteOrder({id}).then(result=>res.status(200).send(result))
        .catch(err=>console.log('err on delete', err))
    }
}