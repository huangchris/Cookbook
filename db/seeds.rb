# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
user = User.create([{ name: "Lauren Ipsum", email: "example@cookbook.com",
  password: "password"}])

tabs = TabTag.create([{data: 1}, {data: 2}, {data: 3}, {data: 4}])
