# == Schema Information
#
# Table name: instructions
#
#  id         :integer          not null, primary key
#  data       :string           not null
#  ord        :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  recipe_id  :integer          not null
#
# Indexes
#
#  index_instructions_on_recipe_id  (recipe_id)
#
# Foreign Keys
#
#  fk_rails_70ae839088  (recipe_id => recipes.id)
#

class Instruction < ActiveRecord::Base
  belongs_to :recipe
end
