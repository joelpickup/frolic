class DashboardController < ApplicationController

  def show
    @my_meetups = current_user.meetups
    render 'dashboard'
    authorize! :show, @my_meetups
  end
end
