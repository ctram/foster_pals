FosterPals.Models.Stay = Backbone.Model.extend({
  urlRoot: '/api/stay',

  animals: function () {
    if(!this._animals) {
      this._animals = new FosterPals.Collections.Animals();
    }
    return this._animals;
  },

  parse: function (response) {
    if(response.animals) {
      this.animals().set(response.animals);
      delete response.animals;
    }
    return response;
  }
});
