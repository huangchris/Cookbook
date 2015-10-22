json.comments @comments do |comment|
  json.extract! comment, :id, :body, :user_id, :recipe_id
end
