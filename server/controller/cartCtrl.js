module.exports = {
    add: (res,req) => {
        const {id} = req.params
        let {user} = req.session
        const index = user.cart.findIndex() 
    }
}