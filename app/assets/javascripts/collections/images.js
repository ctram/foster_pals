FosterPals.Collections.Images = Backbone.Collection.extend({
  url: 'api/images',
  model: FosterPals.Models.Image
});

FosterPals.Collections.images = new FosterPals.Collections.Images();
