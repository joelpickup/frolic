class VenueSuggestion < ActiveRecord::Base
  belongs_to :meetup
  validates :event_id, :allow_nil => true, uniqueness: {scope: :meetup_id}
end
