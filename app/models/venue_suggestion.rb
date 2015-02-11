class VenueSuggestion < ActiveRecord::Base
  belongs_to :meetup
  validates :event_id, uniqueness: {scope: :meetup_id}
end
