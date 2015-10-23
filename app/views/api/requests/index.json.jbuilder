json.requests @requests do |request|
  json.extract! request, :title, :description, :user_id
end
