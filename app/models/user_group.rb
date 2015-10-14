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
# Indexes
#
#  index_user_groups_on_group_id              (group_id)
#  index_user_groups_on_user_id               (user_id)
#  index_user_groups_on_user_id_and_group_id  (user_id,group_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_6d478d2f65  (group_id => groups.id)
#  fk_rails_c298be7f8b  (user_id => users.id)
#

class UserGroup < ActiveRecord::Base
  validates :user_id, :group_id, presence: true
  validates :status, inclusion: %w(pending member admin)
  belongs_to :user
  belongs_to :group
end
