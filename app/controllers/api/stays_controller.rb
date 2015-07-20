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
    # 6/16/2015, 8:54:41 AM - date incoming from params
    check_in_date_str = params[:stay][:check_in_date]
    check_out_date_str = params[:stay][:check_out_date]

    check_in_date_str = check_in_date_str.split('/')
    check_in_month = check_in_date_str[0]
    check_in_day = check_in_date_str[1]
    check_in_year = check_in_date_str[2].split(',')[0]

    check_out_date_str = check_out_date_str.split('/')
    check_out_month = check_out_date_str[0]
    check_out_day = check_out_date_str[1]
    check_out_year = check_out_date_str[2].split(',')[0]

    check_in_date = Date.strptime(check_in_year + '-' + check_in_month + '-' + check_in_month, '%Y-%m-%d')
    check_out_date = Date.strptime(check_out_year + '-' + check_out_month + '-' + check_out_month, '%Y-%m-%d')

    params[:stay][:check_in_date] = check_in_date
    params[:stay][:check_out_date] = check_out_date

    animal_id = params[:stay][:animal_id]
    params[:stay].delete :animal_id

    @stay = Stay.create(stay_params)

    if @stay.save
      params[:stay][:reservations].each do |k, res|
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
      :status
    )
  end
end
