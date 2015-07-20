class Api::AnimalsController < ApplicationController
  before_action :redirect_to_front_if_not_signed_in

  def create
    @animal = Animal.create(animal_params)

    if !@animal.save
      render json: @animal.errors.full_messages, status: 422
      return
    end

# "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png" cartoon dog
    animal_images = Image.where(image_set_id: @animal.image_set_id)
    if animal_images.empty?
      Image.create(
        thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png",
        url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png",
        imageable_type: 'Animal',
        imageable_id: @animal.id
      )
    else
      animal_images.each do |image|
        image.imageable_id = @animal.id
        image.imageable_type = 'Animal'
        image.save
      end
    end
    render :show
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
      :image_set_id
    )
  end
end
