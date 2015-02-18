class CommentsController < ApplicationController
  def create
    @meetup = Meetup.find(params[:meetup_id])
    comment = @meetup.comments.new
    comment.comment = params[:comment]
    comment.user_id = current_user.id
    if comment.save
      redirect_to @meetup
    else
      raise
    end
  end
end
