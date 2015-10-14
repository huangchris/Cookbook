# == Schema Information
#
# Table name: user_groups
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  group_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  status     :string
#
# Foreign Keys
#
#  fk_rails_6d478d2f65  (group_id => groups.id)
#  fk_rails_c298be7f8b  (user_id => users.id)
#

class UserGroup < ActiveRecord::Base
  belongs_to :user
  belongs_to :group
end
