select users.id, first_name, last_name, email, phone, username from users
join user_login on username.id = user_id;