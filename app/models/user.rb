# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string
#  name            :string           not null
#  image           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :email, :password_digest, :name, presence: true
  validates :email, uniqueness: true
  attr_reader :password


  def assign_session_token
    current_user.update(session_token: SecureRandom.urlsafe_base64)
  end

  def logout
    current_user.update(session_token: nil)
  end

  def current_user
    User.where(session_token: session[:session_token])
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    Bcrypt::Password.new(current_user.password_digest).is_password?(password)
  end

end
