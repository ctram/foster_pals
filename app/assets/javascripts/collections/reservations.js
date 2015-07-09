FosterPals.Collections.Reservations = Backbone.Collection.extend({
  url: 'api/reservations',
  model: FosterPals.Models.Reservation
});

FosterPals.Collections.reservations = new FosterPals.Collections.Reservations();
