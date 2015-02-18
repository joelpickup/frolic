class Ability
  include CanCan::Ability

  def initialize(user)
      user ||= User.new # guest user (not logged in)
      if user.persisted?
        can [:read, :update], Meetup do |meetup|
            meetup.attendants.include?(user)
        end
        can :manage, Meetup, :superhost => user
        can :create, VenueSuggestion
        can :manage, Location, :user_id => user.id
      else
        can :read, :none
      end
  end
end
