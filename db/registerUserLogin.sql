insert into user_login (username,password,admin)
values(
    ${username},
    ${hash},
    ${admin}
);
select id from user_login
order by id desc
limit 1;