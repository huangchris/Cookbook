# == Schema Information
#
# Table name: group_admins
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  group_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Foreign Keys
#
#  fk_rails_0ac5a6fa32  (user_id => users.id)
#  fk_rails_1a1d29d2d3  (group_id => groups.id)
#

class GroupAdmin < ActiveRecord::Base
  belongs_to :admin,
    class_name: :User,
    primary_key: :id,
    foreign_key: :user_id

  belongs_to :adminned_group,
    class_name: :Group,
    primary_key: :id,
    foreign_key: :group_id
end
