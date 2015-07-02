FosterPals.Views.AnimalRosterSelector = Backbone.CompositeView.extend({
  initialize: function (options) {

    this.currentUser = options.currentUser;
    this.animals = options.animals;

    for (var i = 0; i < this.animals.models.length; i++) {

      var animal = this.animals.models[i];

      if (animal.stays.length > 0 ) {
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
