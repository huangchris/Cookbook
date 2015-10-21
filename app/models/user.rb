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
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_session_token  (session_token)
#

class User < ActiveRecord::Base
  validates :email, :password_digest, :name, presence: true
  validates :email, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}

  attr_reader :password
  has_many :user_groups, dependent: :destroy
  has_many :groups, through: :user_groups
  has_many :recipes


  def assign_session_token
    self.update(session_token: SecureRandom.urlsafe_base64)
  end

  def self.find_by_credentials(user_params)
    user = User.find_by_email(user_params[:email])
    if user && user.is_password?(user_params[:password])
      return user
    end
  end

  def logout
    self.update(session_token: nil)
  end

  def self.find_by_token(session_token)
    return if session_token.nil?
    User.find_by_session_token(session_token)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def find_family
    # does nothing until we have families ... and then is the .groups.first association
  end

end
