class Meetup < ActiveRecord::Base
  belongs_to :location, class_name: "Location"
  has_many :invitations, dependent: :destroy
  has_many :attendants, through: :invitations, :source => :user
  has_many :host_invites, -> { where role: "host"}, class_name: "Invitation"
  has_many :hosts, through: :host_invites, :source => :user
  has_one :superhost_invite, -> {where role: "superhost"}, class_name: "Invitation"
  has_one :superhost, through: :superhost_invite, :source => :user
  has_many :date_options, dependent: :destroy
  has_many :venue_suggestions, dependent: :destroy

  accepts_nested_attributes_for :invitations, allow_destroy: true
  
  def guests_that_are(status)
    invitations.where(status: status).map{|invitation| invitation.user}
  end

end
