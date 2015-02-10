class Location < ActiveRecord::Base

  def address
    Geocoder.address([lat,long])
  end

  def loc
    [lat,long]
  end
end
