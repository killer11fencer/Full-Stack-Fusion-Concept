create table users (
    id serial primary key,
    first_name varchar(50),
    last_name varchar(50),
    phone text,
    email varchar(50),
    user_id integer

);

create table user_login (
    id serial primary key,
    username varchar(50),
    password text,
    admin boolean
);

create table posts (
title varchar,
img varchar,
description varchar,
path varchar,
button varchar
);

create table category (
    id serial primary key,
    name varchar
);
create table orders (
id serial primary key,
users_id integer, 
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
    order_id integer,
    dish_id integer,
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


insert into posts (
title,
img,
description, 
path, 
button 
)
values(
'Try our Kimbop',
'https://www.koreanbapsang.com/wp-content/uploads/2012/05/DSC_0406-1-e1536289445158.jpg',
'Kimbop is a favorite snack',
'/menu/2',
'Order now'),

('Stew for the Ages',
'https://www.koreanbapsang.com/wp-content/uploads/2011/10/DSC_1295-2-e1537245593549.jpg',
'Warm up on a cold day',
'/menu',
'Order now'),

('Real Korean BBQ',
'https://static1.squarespace.com/static/5accff4ab40b9d564561908e/5acd00700e2e72f4e513c3d9/5c369588575d1fcf753e067c/1547439978172/korean+bowl3.jpg?format=1000w',
'Try tradition style BBQ',
'/menu',
'Order now');