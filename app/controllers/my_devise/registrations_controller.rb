class MyDevise::RegistrationsController < Devise::RegistrationsController

  def edit
    @my_locations = Location.where(user_id: current_user.id)
  end
end
