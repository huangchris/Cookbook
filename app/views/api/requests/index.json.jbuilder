json.requests @requests do |request|
  json.extract! request, :id, :title, :description, :user_id
end
