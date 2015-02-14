class UsersController < ApplicationController
  respond_to :html, :xml, :json

  def load_users
    @users = User.all
    @users_json = []
    @users.each {|u| @users_json.push({"id" => u["id"], "first_name" => u["first_name"], "surname" => u["surname"]})}
    render json: @users_json
  end

  def make_home
    current_user.home_id = params[:id]
    redirect_to edit_user_registration_path
  end

  def make_work
    current_user.work_id = params[:id]
    redirect_to edit_user_registration_path
  end
end
