FosterPals.Models.Reservation = Backbone.Model.extend({
  urlRoot: '/api/reservations',

  stay: function () {
    if (!this.stay) {
      this.stay = new FosterPals.Models.Stay();
    }
    return this.stay;
  },

  parse: function (response) {
    if (response.stay) {
      this.stay().set(response.stay);
      delete response.stay;
    }
    return response;
  }
});
