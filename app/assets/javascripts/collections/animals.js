FosterPals.Collections.Animals = Backbone.Collection.extend({
  url: '/api/animals',

  model: FosterPals.Models.Animal,

  getOrFetch: function(id) {
    var animals = this;
    var animal = animals.get(id);

    if (animal) {
      return Promise.resolve(animal);
    }

    return new FosterPals.Models.Animal({
      id: id
    }).fetch({
      success: function(model) {
        animals.add(model);
        return model;
      }
    });
  },

  /**
   * @method filterWithoutStays
   * @return {FosterPals.Collections.Animals}
   */
  filterWithoutStays: function() {
    var animalsWithoutStays = this.filter(function(animal) {
      return !animal.get('stays').length;
    });
    return new FosterPals.Collections.Animals(animalsWithoutStays);
  }
});

FosterPals.Collections.animals = new FosterPals.Collections.Animals();
