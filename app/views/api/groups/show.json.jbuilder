json.family @group

json.users @valid_users do |user|
  next if user == current_user
  json.id user.id
  json.name user.name
  json.image user.image
end

json.new_users @pending_users do |user|
  json.id user.id
  json.name user.name
  json.image user.image
end

if @admins.include?(current_user)
  json.admin true
end

json.admin_ids do
  json.array! @admins.ids
end
