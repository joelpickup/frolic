class DateOptionsController < ApplicationController

  def destroy
    @date_option = DateOption.find(params[:id])
    @date_option.destroy
    @meetup = Meetup.find(@date_option.meetup_id)
    redirect_to @meetup
  end
end
