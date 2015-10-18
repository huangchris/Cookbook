# == Schema Information
#
# Table name: instructions
#
#  id         :integer          not null, primary key
#  inst       :string           not null
#  ord        :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Instruction < ActiveRecord::Base
  belongs_to :recipe
end
