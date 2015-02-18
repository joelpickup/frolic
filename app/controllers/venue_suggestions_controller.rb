class VenueSuggestionsController < ApplicationController
  load_and_authorize_resource
  def create
    @venue_suggestion = VenueSuggestion.new(venue_suggestion_params)
    @venue_suggestion.user_id = current_user.id
    if @venue_suggestion.save
      @html_content = render_to_string partial: 'meetups/venue_suggestion', :locals => { :venue_suggestion => @venue_suggestion }
      render :json => { :venueSuggestionPartial => @html_content }
    end
  end

  private
  def venue_suggestion_params
    params.require(:venue_suggestion).permit(:venue_name, :meetup_id, :lat, :long, :event_name, :event_description)
  end
end
