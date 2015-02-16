class MeetupsController < ApplicationController
  respond_to :html, :xml, :json
  
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
  end
  
  def update
    @meetup = Meetup.find(params[:id])
    if @meetup.update_attributes(meetup_params)
      redirect_to meetup_path
    end
  end
  def add_dates
    @meetup = Meetup.find(params[:id])
    x = @meetup.add_dates(meetup_params)
    raise
  end
  private
  def meetup_params
    params.require(:meetup).permit(:id, :name, :description, :date_options_1, :date_options_2, :date_options_3, {:invitations_attributes => [:user_id, :_destroy]})
  end
end
