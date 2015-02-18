class VotesController < ApplicationController

  def vote_date
    d = DateOption.find(params[:id])
    @meetup = Meetup.find(d.meetup_id)
    if current_user.voted_for? d
      d.unliked_by current_user
    else
      d.liked_by current_user
    end
    redirect_to @meetup
  end

  def vote_venue
    v = VenueSuggestion.find(params[:id])
    @meetup = Meetup.find(v.meetup_id)
    if current_user.voted_for? v
      v.unliked_by current_user
    else
      v.liked_by current_user
    end
    redirect_to @meetup
  end

end