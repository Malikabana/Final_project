create database if not exists multiplayer_gamehub;

use multiplayer_gamehub;

drop table if exists matchmaking_preferences;
drop table if exists games;
drop table if exists users;

create table users (
  id int auto_increment primary key,
  username varchar(50) not null unique,
  email varchar(100) not null unique,
  password text not null,
  wins int default 0,
  losses int default 0,
  online boolean default false
);

create table games (
  room_id char(36) primary key,
  game_type varchar(50),
  player1_id char(36),
  player2_id char(36),
  winner_id char(36),
  final_state text,
  status varchar(20),
  created_at timestamp default current_timestamp
);

create table matchmaking_preferences (
  user_id char(36) primary key,
  preferred_game varchar(50),
  skill_level int,
  region varchar(50)
);

select * from users;
