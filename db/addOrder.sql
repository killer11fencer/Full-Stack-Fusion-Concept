insert into orders (users_id,status)
values (
    $1,
    $2
    
);

insert into order_items (dish_id,quantity,user_id)
values (
    $3,
    $4,
    $5
);