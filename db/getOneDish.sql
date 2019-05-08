select dishes.id as dish_id, dishes.name as dish_name, description,img,price, category.name as name from dishes
join category on category.id = dishes.category_id
where dishes.id = ${id};
