class Api::AnimalsController < ApplicationController
  before_action :redirect_to_front_if_not_signed_in

  def create
    debugger
    @animal = Animal.create(animal_params)
    if !@animal.save
      render json: @animal.errors.full_messages
    end
  end

  def show
    @animal = Animal.find(params[:id])
    render :show
  end

  def index
    @animals = Animal.all
    render json: @animals
  end

  def update
    @animal = Animal.find(params[:id])
    @animal.update(animal_params)
    render :show
  end

  private

  def animal_params
    params.require(:animal).permit(
      :name,
      :species,
      :sex,
      :breed,
      :color,
      :org_id,
      :fosterer_id,
      :weight,
      :status
    )
  end

end
