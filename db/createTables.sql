create table users (
    id serial primary key,
    first_name varchar(50),
    last_name varchar(50),
    phone integer,
    email varchar(50)

);

create table posts (
title varchar,
img varchar,
description varchar,
path varchar,
button varchar
);

create table user_login (
    id serial primary key,
    username varchar(50),
    password text
);
create table category (
    id serial primary key,
    name varchar
);
create table orders (
id serial primary key,
users_id integer references users,
status varchar(50),
created_at varchar,
notes varchar
);
create table dishes (
    id serial primary key,
    name varchar,
    description text,
    img varchar,
    category_id integer references category,
    price integer
);
create table order_items (
    id serial primary key,
    order_id integer references orders,
    dish_id integer references dishes,
    quantity integer
);


--Inserted Data
insert into category (name)
values ('Appetizers'),
('Entrees'),
('Soups'),
('Stews'),
('Desserts'),
('Drinks');

insert into dishes (name,description,img,category_id,price)
values('Kimbop',
'sushi roll with beef bulgogi',
'https://www.thespruceeats.com/thmb/IyxiJdbwFaixy4iolNYTLjBmW_w=/4288x2848/filters:fill(auto,1)/kimbap-korean-sushi-rolls-2118795-Hero-5b7dbdd346e0fb00250718b8.jpg',
1,
6)

insert into posts (
title,
img,
description, 
path, 
button 
)
values (
'Try our Kimbop',
'https://www.koreanbapsang.com/wp-content/uploads/2012/05/DSC_0406-1-e1536289445158.jpg',
'Kimbop is a favorite snack',
'/menu/2',
'Order now')


