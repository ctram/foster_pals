FosterPals.Views.AnimalsIndex = Backbone.CompositeView.extend({
  initialize: function (options) {
    // HACK: Quick and dirty: have the newest animal at top of the list.
    // TODO: use collection comparators to flip the list.

    for (var i = this.collection.models.length - 1; i >= 0; i--) {
      var animal = this.collection.models[i];
      var org_id = animal.attributes.org_id;
      this.addAnimalItemView(animal);
    }
  },
  events: {
    'click .animal-item-view': 'toAnimalShow'
  },

  template: JST['animal_roster/animals_index/animals_index'],

  className: 'animals-index-view',

  addAnimalItemView: function (animal) {
    var fosterer = animal.fosterer();
    var stays = animal.attributes.stays;
    var org = animal.org();

    var animalItemView = new FosterPals.Views.AnimalItem({
      animal: animal,
      fosterer: fosterer,
      stays: stays,
      org: org
    });
    this.addSubview('div.animals-list', animalItemView);
  },

  render: function () {
    var content = this.template({animals: this.collection});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  toAnimalShow: function (event) {
    var animalId = $(event.currentTarget).find('.animal-name').data('animal-id');
    Backbone.history.navigate('animals/' + animalId, {trigger: true});
  }
});
