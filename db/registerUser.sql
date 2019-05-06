insert into user_login (username,password)
values(
    ${username},
    ${hash}
) returning username, password;

insert into users (first_name,last_name,email,phone)
values (
    ${first_name},
    ${last_name},
    ${email},
    ${phone}
);