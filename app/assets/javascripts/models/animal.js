FosterPals.Models.Animal = Backbone.Model.extend({
  urlRoot: '/api/animals',

  images: function () {
    if (!this._images) {
      this._images = new FosterPals.Collections.Images();
    }
    return this._images;
  },

  parse: function (response) {
    if (response.images) {
      this.images().set(response.images);
      delete response.images;
    }
    return response;
  }

});
