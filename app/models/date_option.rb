class DateOption < ActiveRecord::Base
  belongs_to :meetup
  validate :date_cannot_be_in_the_past
  validates :meetup_id, presence: true

  acts_as_votable

  def date_cannot_be_in_the_past
    if date < Date.today
      errors.add(:date, "can't be in the past")
    end
  end
end
