class Meetup < ActiveRecord::Base
  belongs_to :location, class_name: "Location"
  has_many :invitations
  has_many :attendants, through: :invitations, :source => :user
  has_many :host_invites, -> { where role: "host"}, class_name: "Invitation"
  has_many :hosts, through: :host_invites, :source => :user
  has_one :superhost_invite, -> {where role: "superhost"}, class_name: "Invitation"
  has_one :superhost, through: :superhost_invite, :source => :user
  has_many :date_options
end
