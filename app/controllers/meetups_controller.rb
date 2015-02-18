class MeetupsController < ApplicationController
  respond_to :html, :xml, :json
  load_and_authorize_resource
  def new
    @meetup = Meetup.new
    @meetup.invitations.new 
  end

  def create
    @meetup = current_user.organise_meetup(meetup_params)
    @meetup.save
    redirect_to @meetup
  end

  def show
    @meetup = Meetup.find(params[:id])
    @attending = @meetup.guests_that_are("accepted")
    @invited = @meetup.guests_that_are("invited")
    @declined = @meetup.guests_that_are("declined")
    @date_options = @meetup.date_options
    @start_date = @date_options.min_by do |date_option| date_option.date end
    @end_date = @date_options.max_by do |date_option| date_option.date end
    @dates = @date_options.map{|date_option|date_option.date}
    @venue_suggestions = @meetup.venue_suggestions
    @most_liked_date = @date_options.max_by do |date_option| date_option.get_likes.count end
    @most_liked_venue = @venue_suggestions.max_by do |venue_suggestion| venue_suggestion.get_likes.count end
  end
  
  def update
    @meetup = Meetup.find(params[:id])
    if @meetup.update_attributes(meetup_params)
      redirect_to meetup_path
    else
      redirect_to meetup_path
    end
  end
  def add_dates
    @meetup = Meetup.find(params[:id])
    @meetup.add_dates(meetup_params)
    @meetup.save
    redirect_to @meetup
  end
  private
  def meetup_params
    params.require(:meetup).permit(:id, :name, :description, :date_options_1, :date_options_2, :date_options_3, {:invitations_attributes => [:user_id, :_destroy]})
  end
end
