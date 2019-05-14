select orders.id,status,created_at,notes,orders.users_id, first_name,last_name, phone, email from orders
join users on orders.users_id = users.user_id
order by orders.id desc