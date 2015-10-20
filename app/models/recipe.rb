# == Schema Information
#
# Table name: recipes
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  group_id    :integer          not null
#  personal    :boolean          not null
#  title       :string           not null
#  photo       :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  tab_tag_id  :integer          not null
#
# Indexes
#
#  index_recipes_on_group_id    (group_id)
#  index_recipes_on_tab_tag_id  (tab_tag_id)
#  index_recipes_on_title       (title)
#  index_recipes_on_user_id     (user_id)
#
# Foreign Keys
#
#  fk_rails_0274796f21  (group_id => groups.id)
#  fk_rails_38215c342f  (tab_tag_id => tab_tags.id)
#  fk_rails_9606fce865  (user_id => users.id)
#

class Recipe < ActiveRecord::Base
  validates :user_id, :group_id, :title, presence: true
  validate :shared_recipe_dups

  belongs_to :user
  belongs_to :group
  has_many :ingredients
  has_many :instructions
  has_many :recipe_search_tags
  has_many :search_tags, through: :recipe_search_tags
  belongs_to :tab_tag

  def self.find_by_user(id)
    User.find(id).recipes
    # finds both personal and shared... should it?
  end

  def self.find_by_current_family(current_user)
    Recipe.where(group_id: current_user.groups[0]).where(personal: false)
  end


  def shared_recipe_dups
    # so .where("id != NULL") doesn't work...
    shared_recipes = Recipe.where(group_id: self.group_id)
      .where(personal: false).where(title: self.title)
    personal_recipes = Recipe.where(user_id: self.user_id)
      .where(title: self.title)
    if self.id.nil? && (shared_recipes.any? || personal_recipes.any?)
        errors[:title] << "Already have a recipe for this"
    elsif shared_recipes.where("id != ?", self.id).any? ||
      personal_recipes.where("id != ?", self.id).any?
        errors[:title] << "Already have a recipe for this"
    end
  end
end
