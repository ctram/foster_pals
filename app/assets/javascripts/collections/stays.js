FosterPals.Collections.Stays = Backbone.Collection.extend({
  url: '/api/stays',

  model: FosterPals.Models.Stay,

  getOrFetch: function(id) {
    var stays = this;
    var stay = stays.get(id);
    if (!stay) {
      stay = new FosterPals.Models.Stay({
        id: id
      });
      stay.fetch({
        success: function(model, response, options) {
          stays.add(model);
        }
      });
    } else {
      stay.fetch();
    }
    return stay;
  }
});

FosterPals.Collections.stays = new FosterPals.Collections.Stays();
