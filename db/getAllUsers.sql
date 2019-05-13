select users.id, first_name,last_name,phone,email,username from users
join user_login on user_login.id = users.user_id;