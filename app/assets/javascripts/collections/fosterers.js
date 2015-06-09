FosterPals.Collections.Fosterers = Backbone.Collection.extend({
  model: FosterPals.Models.Fosterer,

  getOrFetch: function (id) {
    var fosterers = this;
    var fosterer = fosterers.get(id);
    if (!fosterer) {
      fosterer = new FosterPals.Models.Fosterer({
        id : id
      });
      fosterer.fetch({
        success: function (model, response, options) {
          fosterers.add(model);
        }
      });
    } else {
      fosterer.fetch();
    }
    return fosterer;
  }
});

FosterPals.Collections.fosterers = new FosterPals.Collections.Fosterers();
