class MeetupsController < ApplicationController
  respond_to :html, :xml, :json

def new
  @meetup = Meetup.new
end

def create
  redirect_to dashboard_path
end
end
