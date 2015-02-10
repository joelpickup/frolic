class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :home, class_name: "Location"
  belongs_to :work, class_name: "Location"
  has_many :invitations
  has_many :meetups, through: :invitations
  has_and_belongs_to_many :interests, class_name: "Category"
end
