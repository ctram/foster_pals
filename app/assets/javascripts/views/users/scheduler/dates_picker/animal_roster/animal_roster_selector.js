FosterPals.Views.AnimalRosterSelector = Backbone.CompositeView.extend({
  template: JST['users/scheduler/dates_picker/animal_roster_selector/animal_roster_selector'],

  className: 'animal-roster-selector',

  events: {
  },

  initialize: function (options) {

    this.currentUser = options.currentUser;
    var animalRoster = this.currentUser.animals_as_org();

    // TODO: only include animals that have NOT been placed yet.
    for (var i = 0; i < animalRoster.length; i++) {
      var animalSelectorItemView = new FosterPals.Views.AnimalSelectorItem({
        model: animalRoster.models[i]
      });
      this.addSubview('#selector', animalSelectorItemView);
    }
  },

  addAnimalToRosterSelector: function (animal) {

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
  }


});
