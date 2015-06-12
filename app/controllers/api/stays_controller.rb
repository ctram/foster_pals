class Api::StaysController < ApplicationController

  def show
    @stay = Stay.find(params[:id])
    render :show
  end

  def index
    @stays = Stay.all
    render :index
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
    @stay = Stay.find(params[:id])
    if @stay.update(stay_params)
      render :show
    else
      render json: @stay.errors.full_messages
    end
  end

  def destroy
    @stay = Stay.find(params[:id])
    @stay.destroy()
    render :show
  end

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
