FosterPals.Views.AnimalRosterSelector = Backbone.CompositeView.extend({
  template: JST['users/scheduler/dates_picker/animal_roster_selector/animal_roster_selector'],

  className: 'animal-roster-selector',

  events: {
    // 'selectableselected #selector': 'removeAnimalView',
  },

  initialize: function (options) {

    this.currentUser = options.currentUser;
    this.animalRoster = this.currentUser.animals_as_org();

    // TODO: only include animals that have NOT been placed yet.
    for (var i = 0; i < this.animalRoster.length; i++) {
      var animalSelectorItemView = new FosterPals.Views.AnimalSelectorItem({
        model: this.animalRoster.models[i]
      });
      this.addSubview('#selector', animalSelectorItemView);
    }
    this.listenTo(FosterPals.Events, 'removeAnimal', this.removeAnimalView);
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
  },

  removeAnimalView: function (event) {
    var $selected = $('#selector').find('.selected');
    var numSelected = $selected.length;
    if (numSelected > 0 ) {
      for (var i = 0; i < numSelected; i++) {
        var $animal = $($selected[i]);
        var animalId = parseInt($animal.attr('animal_id'));
        var animal = this.animalRoster.get(animalId);
        this.removeModelSubview('#selector', animal)
      }
    }
  }
});
