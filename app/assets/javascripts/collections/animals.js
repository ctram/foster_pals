FosterPals.Collections.Animals = Backbone.Collection.extend({
  model: FosterPals.Models.Animal,

  getOrFetch: function (id) {
    var animals = this;
    var animal = animals.get(id);
    if (!animal) {
      animal = new FosterPals.Models.Animal({
        id : id
      });
      animal.fetch({
        success: function (model, response, options) {
          animals.add(model);
        }
      });
    } else {
      animal.fetch();
    }
    return animal;
  }
});

FosterPals.Collections.animals = new FosterPals.Collections.Animals();
