class Api::ImagesController < ApplicationController
  def index
    render json: Image.all.to_json
  end

  def create
    image = Image.new(image_params)
    image.thumb_url = set_image_thumb_size image.thumb_url
    if image.save
      render json: image
    else
      render json: {message: 'failure'}, status: 422
    end
  end

  def show
    render json: Image.find(params[:id])
  end

  def set_image_thumb_size thumb_url
    url = thumb_url
    url_split = url.split(',')
    url_front = url_split[0]

    image_height = url_split[1]
    image_width = url_split[2].split('/')[0]

    url_back = url_split[2].split('/').drop(1).join('/')

    image_width = "w_150"
    image_height = "h_150"

    completed_url = url_front + ',' + image_height + ',' + image_width + '/' + url_back
  end

  private
  
  def image_params
    params.require(:image).permit(:url, :thumb_url, :imageable_id, :image_set_id, :imageable_type)
  end
end
