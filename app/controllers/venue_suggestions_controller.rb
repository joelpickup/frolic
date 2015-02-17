class VenueSuggestionsController < ApplicationController
  def new
    @venue_suggestion = VenueSuggestion.new(venue_suggestion_params)
    @venue_suggestion.user_id = current_user.id
    @venue_suggestion.save
    puts "*"*100
    puts @venue_suggestion
  end

  private
  def venue_suggestion_params
    params.require(:venue_suggestion).permit(:venue_name, :meetup_id, :lat, :long)
  end
end
