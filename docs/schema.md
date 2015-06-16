# Schema Information

## users
column name | data type
------------|-----------|-----------------------
password_digest | string
session_token| string  
role| string  
first_name| string  
last_name| string  
email| string  
types_of_animals_at_location| string  
num_native_animals_at_location| integer  
num_animals_willing_to_foster| integer  
street_address| string  
city| string  
state| string  
zip code| string  



## animals
column name | data type
------------|-----------
org_id | integer
foster_id | integer
name | string
species | string
sex | string
weight | integer
breed | string
color | string

## messages
column name | data type
------------|-----------
messageable_type | string
author_id | integer
recipient_id | integer
title | string
content | text

## stays
column name | data type
------------|-----------
animal_id | integer
foster_id | integer
org_id | integer
check_in_date | date
check_out_date | date
status | string
