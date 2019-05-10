insert into orders (users_id, status)
values (
    $1,
    $2
    
);

select id from orders
order by id desc
limit 1;


