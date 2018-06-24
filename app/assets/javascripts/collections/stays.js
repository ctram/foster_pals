FosterPals.Collections.Stays = Backbone.Collection.extend({
  url: '/api/stays',

  model: FosterPals.Models.Stay,

  getOrFetch: function(id) {
    var stays = this;
    var stay = stays.get(id);

    if (stay) {
      return Promise.resolve(stay);
    }

    return new FosterPals.Models.Stay({
      id: id
    }).fetch({
      success: function(model) {
        stays.add(model);
      }
    });
  }
});

FosterPals.Collections.stays = new FosterPals.Collections.Stays();
