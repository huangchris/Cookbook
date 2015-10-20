# == Schema Information
#
# Table name: search_tags
#
#  id         :integer          not null, primary key
#  data       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_search_tags_on_data  (data) UNIQUE
#

class SearchTag < ActiveRecord::Base
  has_many :recipe_search_tags
  has_many :recipes, through: :recipe_search_tags
end
