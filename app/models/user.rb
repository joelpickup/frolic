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
  acts_as_voter
  # after_destroy :cleanup

  def name
    [first_name, surname].delete_if(&:blank?).join(' ')
  end

  def organise_meetup(attrs={})
    Meetup.create(attrs) do |meetup|
      meetup.invitations.new(user: self, role: :superhost, status: :accepted)
    end
  end

  def role?(role_to_compare)
    self.role.to_s == role_to_compare.to_s
  end

  def invited_to?(meetup)
    meetup.attendants.include?(self)
  end

  def meetups_as_superhost
    meetups.select{|meetup| meetup.superhost == self}
  end

  def meetups_as_host
    meetups.select{|meetup| meetup.host == self}
  end
end
