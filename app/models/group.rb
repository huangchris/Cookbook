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
  has_many :user_groups
  has_many :users, through: :user_groups

  def admins
    User.joins(:user_groups).where(user_groups: {group_id: 1})
      .where(user_groups: {status: "admin"})

  end
end
