class Api::StaysController < ApplicationController

  def new
    @stay = Stay.new
  end

  def create
    @stay = Stay.create(stay_params)
    if @stay.save
      render :show
    else
      render json: @stay.errors.full_messages
    end
  end

  def update

  private

  def stay_params
    params.require(:stay).permit(
      :password,
      :role,
      :org_name,
      :first_name,
      :last_name,
      :email,
      :street_address,
      :city,
      :state,
      :zip_code,
      :num_animals_willing_to_foster
    )
  end

  def complete_attributes_for_stay_creation
    if params[:stay][:role] == 'fosterer'
      params[:stay][:org_name] = 'NOT_ORG'
    end
  end

end
