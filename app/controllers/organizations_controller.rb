class OrganizationsController < ApplicationController
  def new
    @organization = Organization.new
  end

  def create
    @organization = Organization.create(organization_params)
    if @organization.save
      sign_in(@organization)
      redirect_to 'home'
    else
      flash[:errors] = @organization.errors.full_messages
      render :new
    end
  end

  def show
    @organization = Organization.find(params[:id])
    render json: @foster
  end

  def edit
    @organization = Organization.find(params[:id])
    render json: @foster
  end

  def index
    @organizations = Organization.all
    render json: @organizations
  end

  private

  def organization_params
    params.require(:organization).permit(
      :leader_first_name,
      :leader_last_name,
      :email,
      :street_address,
      :city,
      :state,
      :zip_code
    )
  end

end
