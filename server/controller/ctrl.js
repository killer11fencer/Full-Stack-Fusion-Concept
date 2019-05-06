const bcrypt = require('bcryptjs')
module.exports = {
    getAllDishes: (req,res) => {
        const db = req.app.get('db')
        db.getAllDishes().then(result=>res.status(200).send(result)).catch(err=>console.log('err on get',err))

    },
    getOneDish: (req,res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.getOneDish({id}).then(result=>res.status(200).send(result)).catch(err=>console.log('err on getOne',err))
    }

}