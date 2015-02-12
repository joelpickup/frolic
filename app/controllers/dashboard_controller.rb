class DashboardController < ApplicationController
  def show
    @my_meetups = current_user.meetups
    render 'dashboard'
  end
end
