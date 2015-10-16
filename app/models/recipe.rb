# == Schema Information
#
# Table name: recipes
#
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
#
# Indexes
#
#  index_recipes_on_group_id  (group_id)
#  index_recipes_on_title     (title)
#  index_recipes_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_0274796f21  (group_id => groups.id)
#  fk_rails_9606fce865  (user_id => users.id)
#

class Recipe < ActiveRecord::Base
  validates :user_id, :group_id, :personal, :title, :photo, :ingredients,
    :instructions, presence: true
  validate :shared_recipe_dups

  belongs_to :user
  belongs_to :group


  def shared_recipe_dups
    if Recipe.where(group_id: self.group_id).where(personal: false).where(title: self.title).any?
      errors[:title] << "Already have a recipe for this"
    end
  end
end
