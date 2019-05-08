module.exports = {
    add: async (res,req) => {
      
        const {id} = req.params
        let {user} = req.session
         
        const index = user.cart.findIndex(dish=>dish.dish_id == id) 
        if(index === -1) {
            const selectedDish = dish.find(dish=> dish.dish_id == id);

            user.cart.push(selectedDish);
            user.total +- selectedDish.price
        }
        res.status(200).send(user)
    }
}