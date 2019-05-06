create table users (
    id serial primary key,
    first_name varchar(50),
    last_name varchar(50),
    phone integer,
    email varchar(50)

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





