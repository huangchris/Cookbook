json.data "Request received"
#  id           :integer          not null, primary key
#  user_id      :integer          not null
#  group_id     :integer          not null
#  personal     :boolean          not null
#  title        :string           not null
#  photo        :string
#  description  :text
#  ingredients  :text             not null
#  instructions :text             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
json.recipes @recipes do |recipe|
  json.extract! recipe, :id, :user_id, :group_id, :personal, :title, :photo, :description,
    :ingredients, :instructions, :search_tags, :tab_tags
end
