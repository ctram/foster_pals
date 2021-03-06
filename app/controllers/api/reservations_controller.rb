class Api::ReservationsController < ApplicationController
  def create
    @reservation = Reservation.new(reservation_params)
    @reservation.save ? render(:show) : render(json: @reservation.errors.full_messages, status: 422)
  end

  private

  def reservation_params
    params.require(:reservation).permit(:animal_id, :stay_id)
  end
end
