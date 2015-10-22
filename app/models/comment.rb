# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  recipe_id  :integer          not null
#  body       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_comments_on_recipe_id  (recipe_id)
#  index_comments_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_03de2dc08c  (user_id => users.id)
#  fk_rails_fa790d5166  (recipe_id => recipes.id)
#

class Comment < ActiveRecord::Base
  validates :user_id, :recipe_id, :body, presence: true
  belongs_to :user
  belongs_to :recipe

end
