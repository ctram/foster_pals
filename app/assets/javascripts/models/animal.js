FosterPals.Models.Animal = Backbone.Model.extend({
  urlRoot: '/api/animals',

  images: function () {
    if (!this._images) {
      this._images = new FosterPals.Collections.Images();
    }
    return this._images;
  },

  fosterer: function () {

    if (!this._fosterer) {
      this._fosterer = new FosterPals.Models.User();
    }
    return this._fosterer;
  },

  parse: function (response) {
    if (response.images) {
      this.images().set(response.images);
      delete response.images;
    }

    if (response.fosterer) {

      this.fosterer().set(response.fosterer);
        
      delete response.fosterer;
    }
    return response;
  }

});
