module.exports = {

    getCart: async (req,res) => {
        let {cart} = req.session
        res.status(200).send(cart)
    },
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
        res.status(200)
    },
    remove: async (req,res) => {
        let{cart} = req.session
        let {dish_id,price,quantity} = req.body
        const index = await cart.cart.findIndex(dish=>dish.dish_id === dish_id)
        cart.cart.splice(index,1)
        cart.total -= (price * quantity)
        req.session.save()
        res.status(200)
    },
   update: async (req,res) => {
        let {cart} = req.session
        let {dish_id,price,quantity} = req.body
        const index = await cart.cart.findIndex(dish=>dish.dish_id === dish_id)
        if(cart.cart[index].quantity < quantity) {
            cart.cart[index].quantity += quantity
            cart.total += (quantity * price)
        } else {cart.cart[index].quantity -= quantity
            cart.total -= (quantity * price)
        }
        req.session.save()
        return res.status(200)
    }

            
}

