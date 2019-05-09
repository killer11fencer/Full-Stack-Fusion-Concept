insert into orders (users_id,status,created_at,notes)
values (
    ${users_id},
    ${status},
    ${created_at},
    ${notes}
);

insert into order_items (dish_id,quantity,user_id)
values (
    ${dish_id},
    ${quantit},
    ${user_i})
);