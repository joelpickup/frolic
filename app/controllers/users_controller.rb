class UsersController < ApplicationController
  respond_to :html, :xml, :json
  def make_home
    current_user.home_id = params[:id]
    redirect_to edit_user_registration_path
  end

  def make_work
    current_user.work_id = params[:id]
    redirect_to edit_user_registration_path
  end
end
