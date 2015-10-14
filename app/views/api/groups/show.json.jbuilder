json.family @group

json.users @users do |user|
  json.id user.id
  json.name user.name
end
