class UsersController < ApplicationController
  respond_to :html, :xml, :json

  def load_users
    @users = User.all
    render json: @users
  end
end
