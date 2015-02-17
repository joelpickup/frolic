class VenueSuggestionsController < ApplicationController

  def create
    puts "*"*800
    @venue_suggestion = VenueSuggestion.new(venue_suggestion_params)
    @venue_suggestion.user_id = current_user.id
    if @venue_suggestion.save
      render :json => { :success => "success", :status_code => "200" }
    end
  end

  private
  def venue_suggestion_params
    params.require(:venue_suggestion).permit(:venue_name, :meetup_id, :lat, :long, :event_name, :event_description)
  end
end
