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

  attr_accessor :date_options_1
  attr_accessor :date_options_2
  attr_accessor :date_options_3

  def self.options_1
    %w(Monday Tuesday Wednesday Thursday Friday Saturday Sunday Weekday Weekend) + ["any day"]
  end
  
  def self.options_3
    %w(days weeks months)
  end

  def add_dates(params)
    day, number, period = params["date_options_1"], params["date_options_2"].to_i, params["date_options_3"]
    date_options.new(date: date_of_next(day))
    end_date = calculate_end_date(period, number)
  end

  def guests_that_are(status)
    invitations.where(status: status).map{|invitation| invitation.user}
  end

  private
  def date_of_next(day)
    date = Date.parse(day)
    delta = date > Date.today ? 0 : 7
    date + delta
  end
  def calculate_end_date(period, number)
    start_date = Date.today
    case period
    when 'days'
      start_date.next_day(number)
    when 'weeks'
      start_date.next_day(number*7)
    when 'months'
      start_date.next_month(number)
    end
  end
end
