FosterPals.Views.AnimalRosterSelector = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.currentUser = options.currentUser;
    this.animalRoster = this.currentUser.animals_as_org();
    for (var i = 0; i < this.animalRoster.length; i++) {
      var animal = this.animalRoster.models[i].attributes;
      // TODO: only include animals that have NOT been placed yet.
      if (animal.status !== '-') {
        continue;
      }
      var animalSelectorItemView = new FosterPals.Views.AnimalSelectorItem({
        model: this.animalRoster.models[i]
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
