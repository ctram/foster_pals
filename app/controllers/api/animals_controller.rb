class Api::AnimalsController < ApplicationController
  before_action :redirect_to_front_if_not_signed_in

  def create
    @animal = Animal.create(animal_params)
    if !@animal.save
      render json: @animal.errors.full_messages
      return
    end

    animal_images = Image.where(image_set_id: @animal.image_set_id)
    animal_images.each do |image|
      image.imageable_id = @animal.id
      image.save
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
      :status,
      :image_set_id
    )
  end

end
