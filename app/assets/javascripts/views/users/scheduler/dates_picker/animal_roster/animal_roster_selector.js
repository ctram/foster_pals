FosterPals.Views.AnimalRosterSelector = Backbone.CompositeView.extend({
  initialize: function (options) {

    this.currentUser = options.currentUser;
    this.animals = options.animals;

    for (var i = 0; i < this.animals.models.length; i++) {
      var animal = this.animals.models[i];
      var name = animal.attributes.name;

      // TODO: animals with denied stays should be able to be included on new reservation requests - right now only animals with no stay what so ever are able to be included on reservation requests - animals only get one chance to make a reservation.
      if (animal.attributes.stays.length > 0 ) {
        // FIXME: do not show animals with confirmed stays
        continue;
      }
      var animalSelectorItemView = new FosterPals.Views.AnimalSelectorItem({
        model: this.animals.models[i]
      });
      this.addSubview('#selector', animalSelectorItemView);
    }
    this.listenTo(FosterPals.Events, 'removeAnimal', this.removeAnimalView);
    this.listenTo(FosterPals.Events, 'addAnimal', this.addAnimalView);
  },

  template: JST['users/scheduler/dates_picker/animal_roster_selector/animal_roster_selector'],

  className: 'animal-roster-selector',

  events: {
  },

  addAnimalView: function (animal) {
    var animalSelectorItemView = new FosterPals.Views.AnimalSelectorItem({
      model: animal
    });
    this.addSubview('#selector', animalSelectorItemView);
  },

  render: function () {
    var content = this.template({
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  removeAnimalView: function (animal) {
    this.removeModelSubview('#selector', animal);
  }
});
