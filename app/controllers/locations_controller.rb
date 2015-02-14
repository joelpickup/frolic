class LocationsController < ApplicationController
  respond_to :html, :xml, :json

  def new
    @location = Location.new
  end

  def create

  end

  def show

  end

  private
  def location_params
    params.require(:location).permit(:name, :description, :user_id, :address_1, :address_2, :town, :county, :postcode)
  end
end
