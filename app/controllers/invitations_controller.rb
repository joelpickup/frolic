class InvitationsController < ApplicationController
  def update
    @invitation = Invitation.find(params[:id])
    @invitation.update_attributes(invitation_params)
    @meetup = @invitation.meetup
    redirect_to @meetup
  end

  private
  def invitation_params
    params.require(:invitation).permit(:status)
  end
end
