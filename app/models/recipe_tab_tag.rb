# == Schema Information
#
# Table name: recipe_tab_tags
#
#  id         :integer          not null, primary key
#  recipe_id  :integer          not null
#  tab_tag_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_recipe_tab_tags_on_recipe_id                 (recipe_id)
#  index_recipe_tab_tags_on_recipe_id_and_tab_tag_id  (recipe_id,tab_tag_id) UNIQUE
#  index_recipe_tab_tags_on_tab_tag_id                (tab_tag_id)
#
# Foreign Keys
#
#  fk_rails_57b714287d  (recipe_id => recipes.id)
#  fk_rails_e774b41fcd  (tab_tag_id => tab_tags.id)
#

class RecipeTabTag < ActiveRecord::Base
  belongs_to :recipe
  belongs_to :tab_tag
end
