create database if not exists ecommerce_inventory;
use ecommerce_inventory;

create table categories (
    id int auto_increment primary key,     
    name varchar(100) not null,
    description text                                  
);

create table vendors (
    id int auto_increment primary key,                
    name varchar(100) not null unique, 
    contact_info text                             
);

create table products (
    id int auto_increment primary key,               
    name varchar(100) not null,                     
    description text,                           
    category_id int,  
    stock_quantity int default 0 check (stock_quantity >= 0),constraint
    price decimal(10,2) not null check (price >= 0), 
    min_stock int default 10,   
    foreign key (category_id) references categories(id) 
);

create table restock_logs (
    id int auto_increment primary key,      
    product_id int not null,      
    vendor_id int not null, 
    quantity int not null check (quantity >= 0), 
    restock_date datetime default current_timestamp,
    foreign key (product_id) references products(id),
    foreign key (vendor_id) references vendors(id)
);

create table inventory_movements (
    id int auto_increment primary key,             
    product_id int not null,        
    change_type enum('in', 'out') not null,        
    quantity int not null check (quantity >= 0), 
    movement_date datetime default current_timestamp, 
    note text,
    foreign key (product_id) references products(id)
);

create table stock_alerts (
    id int auto_increment primary key,               
    product_id int not null,                      
    alert_message varchar(255) not null,      
    alert_date timestamp default current_timestamp,
    foreign key (product_id) references products(id)
);