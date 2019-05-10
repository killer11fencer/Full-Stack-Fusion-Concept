insert into orders (users_id,status)
values (
    $1,
    $2
    
) returning id;