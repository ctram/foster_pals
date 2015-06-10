class AnimalsController < ApplicationController
  def new
    @animal = Animal.new
  end

  def create
    @animal = Animal.create(animal_params)
    if @animal.save
      render json: @animal
    else
      render json: @animal.errors.full_messages
    end
  end

  def show
    @animal = Animal.find(params[:id])
    render json: @animal
  end

  def edit
    @animal = Animal.find(params[:id])
    render json: @animal
  end

  def index
    @animals = Animal.all
    render json: @animals
  end

  private

  def animal_params
    params.require(:animal).permit(
    )
  end

end
