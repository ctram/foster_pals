class OrganizationsController < ApplicationController
  def new
    @organization = Organization.new
  end

  def create
    debugger
    @organization = Organization.create(organization_params)
    if @organization.save
      sign_in(@organization)
      redirect_to home_url
    else
      flash.now[:errors] = @organization.errors.full_messages
      render 'static_pages/register'
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
      :zip_code,
      :name
    )
  end

end
