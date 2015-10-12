# Schema Information

## users

column name     | data type | details
----------------|-----------|------------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
name            | string    | not null
avatar_img      | string    |

## usergroups

column name     | data type | details
----------------|-----------|------------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users), indexed
group_id        | integer   | not null, foreign key (references groups), indexed

## groups

column name     | data type | details
----------------|-----------|------------------------
id              | integer   | not null, primary key
name            | string    | not null, indexed, unique

## groupadmins

column name     | data type | details
----------------|-----------|------------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users), indexed
group_id        | integer   | not null, foreign key (references groups), indexed

## recipes

column name     | data type | details
----------------|-----------|------------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users), indexed
group_id        | integer   | not null, foreign key (references groups), indexed
<!--status          | string    |  not null ("DRAFT", "GROUP", "PERSONAL")-->
personal        | boolean   | not null
title           | string    | not null, indexed,
photo           | string    |
description     | text      |
ingredients     | text      | not null
instructions    | text      | not null

## tags

column name     | data type | details
----------------|-----------|------------------------
id              | integer   | not null, primary key
name            | integer   | not null, indexed

## taggings

column name     | data type | details
----------------|-----------|------------------------
id              | integer   | not null, primary key
recipe_id       | integer   | not null, foreign key (references recipes), indexed
tag_id          | integer   | not null, foreign key (references tags), indexed

## comments

column name     | data type | details
----------------|-----------|------------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users), indexed
recipe_id       | integer   | not null, foreign key (references recipes), indexed
parent_id       | integer   |
body            | text      | not null

## requests

column name     | data type | details
----------------|-----------|------------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users), indexed
group_id        | integer   | not null, foreign key
body            | text      | not null
