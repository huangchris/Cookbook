# == Schema Information
#
# Table name: requests
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :string
#  group_id    :integer          not null
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_requests_on_group_id  (group_id)
#  index_requests_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_16b605658f  (group_id => groups.id)
#  fk_rails_8ead8b1e6b  (user_id => users.id)
#

class Request < ActiveRecord::Base
  validates :title, :group_id, :user_id, presence: true
  belongs_to :user
  belongs_to :group
end
