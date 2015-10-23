# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  user_id          :integer          not null
#  commentable_id   :integer          not null
#  body             :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  commentable_type :string           not null
#
# Indexes
#
#  index_comments_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_03de2dc08c  (user_id => users.id)
#

class Comment < ActiveRecord::Base
  validates :user_id, :commentable_id, :commentable_type, :body, presence: true
  # validates :commentable_type, inclusion: in: ["group", "recipe"]
  belongs_to :user
  belongs_to :commentable, polymorphic: true

end
