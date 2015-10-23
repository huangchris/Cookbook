json.comments @comments do |comment|
  json.extract! comment, :id, :body, :user_id, :commentable_id, :commentable_type
end
