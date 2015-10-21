json.recipes @recipes do |recipe|
  json.extract! recipe, :id, :user_id, :group_id, :personal, :title, :photo, :description,
    :ingredients, :instructions, :search_tags, :tab_tag_id
end
