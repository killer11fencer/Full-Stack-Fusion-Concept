select order_id,dishes.name as dish_name, dishes.price as dish_price, order_items.quantity as quantity from dishes
join order_items on order_items.dish_id = dishes.id
where order_items.order_id = $1