json.recipes @recipes do |recipe|
  json.extract! recipe, :id, :user_id, :group_id, :personal, :title,
    :photo, :description, :tab_tag_id, :search_tags, :ingredients, :instructions
end
