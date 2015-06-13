FosterPals.Collections.Images = Backbone.Collection.extend({
  url: 'api/images',
  model: FosterPals.Models.Image
});

// FIXME: do you need this immediately?
FosterPals.Collections.images = new FosterPals.Collections.Images();
