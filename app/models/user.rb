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
  after_destroy :cleanup




  def organise_meetup(attrs={})
    Meetup.create(attrs) do |meetup|
      meetup.invitations.new(user: self, role: :superhost, status: :accepted)
    end
  end

  def meetups_as_superhost
    meetups.select{|meetup| meetup.superhost == self}
  end

end
