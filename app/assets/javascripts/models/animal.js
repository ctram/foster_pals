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

  org: function () {
    if (!this._org) {
      this._org = new FosterPals.Models.User();
    }
    return this._org;
  },

  stays: function () {
    if (!this._stays) {
      this._stays = new FosterPals.Models.Stays();
    }
    return this._stays;
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

    if (response.org) {
      this.org().set(response.org);
      delete response.org;
    }

    if (response.stay) {
      this.stay().set(response.stay);
      delete response.stay;
    }
    return response;
  }

});
