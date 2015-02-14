class LocationsController < ApplicationController
  respond_to :html, :xml, :json

  def new
    @location = Location.new
  end

  def create
    @location = Location.new(location_params)
    coordinates = Geocoder.coordinates(location_params[:postcode])
    @location.lat = coordinates[0]
    @location.long = coordinates[1]
    @location.save
    redirect_to @location
  end

  def show
    @location = Location.find(params[:id])
  end

  private
  def location_params
    params.require(:location).permit(:name, :description, :user_id, :address_1, :address_2, :town, :county, :postcode)
  end
end
