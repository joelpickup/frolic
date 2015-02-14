class MyDevise::RegistrationsController < Devise::RegistrationsController

  def edit
    @user = current_user
    @my_locations = Location.where(user_id: current_user.id)
  end

end
