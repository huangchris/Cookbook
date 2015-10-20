# == Schema Information
#
# Table name: recipe_search_tags
#
#  id            :integer          not null, primary key
#  search_tag_id :integer          not null
#  recipe_id     :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_recipe_search_tags_on_recipe_id                    (recipe_id)
#  index_recipe_search_tags_on_recipe_id_and_search_tag_id  (recipe_id,search_tag_id) UNIQUE
#  index_recipe_search_tags_on_search_tag_id                (search_tag_id)
#
# Foreign Keys
#
#  fk_rails_d99ee74ad1  (search_tag_id => search_tags.id)
#  fk_rails_e6eedd09af  (recipe_id => recipes.id)
#

class RecipeSearchTag < ActiveRecord::Base
  belongs_to :recipe
  belongs_to :search_tag
end
