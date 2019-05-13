module.exports = {
    deleteDish: (req,res)=> {
        const db = req.app.get('db')
        const {id} = req.params
        db.deleteDish({id}).then(result=>res.status(200).send(result))
    },
    updateDish: (req,res)=> {
        const db = req.app.get('db')
        const {id} = req.params
        const {dish_name,img,price,description,category_id} = req.body
        db.updateDish({id,dish_name,img,price,description,category_id}).then(result=>res.status(200).send(result))
    }
}