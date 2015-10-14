json.family @group

json.users @users do |user|
  next if user == current_user
  json.id user.id
  json.name user.name
  json.image user.image
end

if @admins.include?(current_user)
  json.admin true
end
