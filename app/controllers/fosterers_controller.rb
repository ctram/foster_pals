class FosterersController < ApplicationController
  def new
    @fosterer = Fosterer.new
    @x = 1
  end

  def create
    @fosterer = Fosterer.create(fosterer_params)
    if @fosterer.save
      sign_in(@fosterer)
      redirect_to 'home'
    else
      flash[:errors] = @fosterer.errors.full_messages
      render :new
    end
  end

  def show
    @fosterer = Fosterer.find(params[:id])
    render json: @foster
  end

  def edit
    @fosterer = Fosterer.find(params[:id])
    render json: @foster
  end

  def index
    @fosterers = Fosterer.all
    render json: @fosterers
  end

  private

  def fosterer_params
    params.require(:fosterer).permit(
      :first_name,
      :last_name,
      :email,
      :num_animals_willing_to_foster,
      :street_address,
      :city,
      :state,
      :zip_code
    )
  end

end
