class Invitation < ActiveRecord::Base
  belongs_to :meetup
  belongs_to :user
  validates :user_id, :uniqueness => {:scope => :meetup_id}
end
