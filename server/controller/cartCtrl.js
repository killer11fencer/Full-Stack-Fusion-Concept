module.exports = {

    getCart: async (req,res) => {
        let {cart} = req.session
        res.status(200).send(cart)
    },
    add: async (req,res) => {
        let {cart} = req.session
        let {dish_id,dish_name,img,description,price,quantity} = req.body        
        const index = await cart.cart.findIndex(dish=>dish.dish_id === dish_id) 
        if(index === -1) {
            cart.cart.push({dish_name,img,description,price,dish_id,quantity});
            cart.total += price 
        } 
        else { cart.cart[index].quantity+=1
            cart.total += price }
        req.session.save()
        res.sendStatus(200)
    },
    remove: async (req,res) => {
        let {dish_id,price,quantity} = req.params
        let{cart} = req.session
        const index = await cart.cart.findIndex(dish=>+dish.dish_id=== +dish_id)
     
        cart.cart.splice(index,1)
        cart.total -= (price * quantity)
        req.session.save()
        res.sendStatus(200)
    },
   update: async (req,res) => {
        let {cart} = req.session
        let {dish_id} = req.body
        console.log('uppp',req.body)
       const index = await cart.cart.findIndex(dish=>+dish.dish_id === +dish_id)
       cart.cart.splice(index,1,{...req.body})
       cart.total = await cart.cart.map(item=> item.quantity * item.price).reduce(((acc,val)=>acc+val), 0)
       req.session.save()
       console.log(cart.total) 
       res.sendStatus(200)
        
    },
    createOrder: async (req,res) => {
        const db = req.app.get('db')
        let {cart,user} = req.session
      
        let users_id = user.id


        let status = 'New Order'
        
        const data = await db.addOrder([users_id,status])
        let order_id = data[0].id
        console.log(order_id)
        let orderedItems = cart.cart.map((elem)=>{
            let {dish_id,quantity} = elem
            return db.addOrderItems([dish_id,quantity,users_id,order_id])
        })
        cart.cart = [],
        cart.total = 0

        res.sendStatus(200)


    }

            
}

