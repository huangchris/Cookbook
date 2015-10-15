# == Schema Information
#
# Table name: groups
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Group < ActiveRecord::Base
  validates :name, presence: true

  has_many :user_groups
  has_many :users, through: :user_groups

  def valid_users
    self.users.joins(:user_groups)
    .where("user_groups.status = ? OR user_groups.status = ?","member","admin")
  end

  def pending_users
    self.users.joins(:user_groups).where(user_groups: {status: "pending"})
  end

  def admins
    User.joins(:user_groups).where(user_groups: {group_id: 1})
      .where(user_groups: {status: "admin"})

  end
end
