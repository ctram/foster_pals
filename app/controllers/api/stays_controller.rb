class Api::StaysController < ApplicationController
  before_action :redirect_to_front_if_not_signed_in

  def show
    @stay = Stay.find(params[:id])
    render :show
  end

  def index
    @stays = Stay.all
    render :index
  end

  def create
    fosterer_id, org_id, indefinite_stay, status, reservations, check_in_date, check_out_date = stay_params.values_at(:fosterer_id, :org_id, :indefinite_stay, :status, :reservations, :check_in_date, :check_out_date)
    
    data = {
      fosterer_id: fosterer_id,
      org_id: org_id,
      status: status,
      check_in_date: Date.strptime(check_in_date.split('T').first, '%Y-%m-%d'),
      check_out_date: !check_out_date.empty? && Date.strptime(check_out_date.split('T').first, '%Y-%m-%d') || nil
    }
    
    @stay = Stay.create(data)

    if @stay.save
      reservations.each do |k, res|
        animal_id =  res[:animal_id]
        Reservation.create(animal_id: animal_id, stay_id: @stay.id)
      end
      render :show
    else
      render json: @stay.errors.full_messages, status: 422
    end
  end

  def update
    @stay = Stay.find(params[:id])
    if @stay.update(stay_params)

      if params[:stay][:denyOthers]
        overlapping_stays_arr = current_user.overlapping_pending_stays @stay
        overlapping_stays_arr.each do |stay|
          stay.status = 'denied'
          stay.save
        end
      end
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
      :org_id,
      :indefinite_stay,
      :check_in_date,
      :check_out_date,
      :status,
      reservations: 
      [ 
        :animal_id, 
        :stay_id, 
        animal: [ 
          :org_id, :name, :color, :weight, :species, :sex, :breed, :main_image_thumb_url, :main_image_url, :fosterer_id, :id 
        ]
      ]
    )
  end
end
