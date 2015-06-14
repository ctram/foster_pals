FosterPals.Views.AnimalRosterSelector = Backbone.CompositeView.extend({
  template: JST['users/scheduler/dates_picker/animal_roster_selector/animal_roster_selector'],

  className: 'animal-roster-selector',

  events: {
  },

  initialize: function (options) {
    this.currentUser = options.currentUser;
    var animalRoster = this.currentUser.animals_as_org();
    this.listenTo(animalRoster, 'add', this.addAnimalToRosterSelector);

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
