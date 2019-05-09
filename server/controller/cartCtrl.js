module.exports = {
    add: async (req,res) => {
        let {cart} = req.session
        let {dish_id,dish_name,img,description,price,quantity} = req.body        
        const index = await cart.cart.findIndex(dish=>dish.dish_id === dish_id) 
        console.log('IIIN',index)
        if(index === -1) {
            cart.cart.push({dish_name,img,description,price,dish_id,quantity});
            cart.total += price 
        } 
        else { cart.cart[index].quantity+=1
            cart.total += price }
        req.session.save()
        console.log('caaart',cart)
    }
}