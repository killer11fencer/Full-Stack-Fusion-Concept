delete from orders
where id = ${id};

delete from order_items
where order_id = ${id};