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
    # 6/16/2015, 8:54:41 AM
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

    Date.strptime('2001-02-03', '%Y-%m-%d')

    check_in_date = Date.strptime(check_in_year + '-' + check_in_month + '-' + check_in_month, '%Y-%m-%d')
    check_out_date = Date.strptime(check_out_year + '-' + check_out_month + '-' + check_out_month, '%Y-%m-%d')

    params[:stay][:check_in_date] = check_in_date
    params[:stay][:check_out_date] = check_out_date

    @stay = Stay.create(stay_params)
    if @stay.save
      animal = @stay.animal
      animal.status = 'fostered'
      animal.save
      current_user.deny_overlapping_stays @stay
      render :show
    else
      render json: @stay.errors.full_messages, status: 422
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
      :org_id,
      :indefinite_stay,
      :check_in_date,
      :check_out_date,
      :status
    )
  end
end
