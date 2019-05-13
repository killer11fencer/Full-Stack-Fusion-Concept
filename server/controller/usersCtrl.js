module.exports = {
    getAllUsers: (req,res) => {
        const db = req.app.get('db')
        db.getAllUsers().then(result=>res.status(200).send(result))
    }
}