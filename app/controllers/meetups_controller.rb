class MeetupsController < ApplicationController
  respond_to :html, :xml, :json

  def new
    @meetup = Meetup.new
    @meetup.invitations.new 
  end

  def create
    @meetup = current_user.organise_meetup(meetup_params)
    @meetup.save
    raise
  end

  private
  def meetup_params
    params.require(:meetup).permit(:id, :name, :description, {:invitations_attributes => [:user_id]})
  end
end
