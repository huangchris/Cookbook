class GroupAdmin < ActiveRecord::Base
  belongs_to :admin,
    class: :User,
    primary_key: :id,
    foreign_key: :user_id

  belongs_to :adminned_group,
    class: :Group,
    primary_key: :id,
    foreign_key: :group_id
end
