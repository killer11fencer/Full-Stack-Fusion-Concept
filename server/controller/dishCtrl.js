module.exports = {
    deleteDish: (req,res)=> {
        const db = req.app.get('db')
        const {id} = req.params
        db.deleteDish({id}).then(result=>res.status(200).send(result))
    }
}