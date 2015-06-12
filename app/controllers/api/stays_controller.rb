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
      :animal_id,
      :fosterer_id,
      :organzation_id,
      :indefinite_stay,
      :check_in_date,
      :check_out_date,
      :status
    )
  end
end
