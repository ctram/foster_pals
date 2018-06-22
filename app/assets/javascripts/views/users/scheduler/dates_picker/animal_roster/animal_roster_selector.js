FosterPals.Views.AnimalRosterSelector = Backbone.CompositeView.extend({
  template: JST['users/scheduler/dates_picker/animal_roster_selector/animal_roster_selector'],

  className: 'animal-roster-selector',

  events: {},

  initialize: function(options) {
    this.currentUser = options.currentUser;
    this.animals = options.animals;
    this.fosterer = options.fosterer;

    for (var i = 0; i < this.animals.length; i++) {
      var animalSelectorItemView = new FosterPals.Views.AnimalSelectorItem({
        model: this.animals.models[i]
      });
      this.addSubview('#selector', animalSelectorItemView);
    }
    this.listenTo(FosterPals.Events, 'removeAnimal', this.removeAnimalView);
    this.listenTo(FosterPals.Events, 'addAnimal', this.addAnimalView);
  },

  addAnimalView: function(animal) {
    var animalSelectorItemView = new FosterPals.Views.AnimalSelectorItem({
      model: animal
    });
    this.addSubview('#selector', animalSelectorItemView);
  },

  removeAnimalView: function(animal) {
    this.removeModelSubview('#selector', animal);
  },

  render: function() {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
