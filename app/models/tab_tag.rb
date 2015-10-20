# == Schema Information
#
# Table name: tab_tags
#
#  id         :integer          not null, primary key
#  data       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_tab_tags_on_data  (data) UNIQUE
#

class TabTag < ActiveRecord::Base
  has_many :recipe_tab_tags
  has_many :recipes, through: :recipe_tab_tags
end
