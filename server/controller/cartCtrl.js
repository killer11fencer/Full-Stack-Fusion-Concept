module.exports = {
    add: async (req,res) => {
        let {cart} = req.session
        let {dish_id,dish_name,img,description,price,quantity} = req.body        
        const index = cart.cart.findIndex(dish=>dish.id == dish_id) 
        if(index === -1) {
            cart.cart.push({dish_name,img,description,price,dish_id,quantity});
            cart.total +- price 
        } else { return cart[index].quantity++}
        console.log('caaart',cart.cart)
    }
}