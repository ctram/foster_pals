FosterPals.Views.DatesPicker = Backbone.CompositeView.extend({
  template: JST['users/scheduler/dates_picker/dates_picker'],

  className: 'dates-picker',

  events: {
    'click input#indefinite-stay-checkbox': 'lockCheckOutInput',
    'click .animal-selector-item': 'addChosenAnimal',
    'click .chosen-animal': 'removeChosenAnimal',
    'click .to-animal-roster-btn': 'toAnimalRoster'
  },

  initialize: function(options) {
    this.currentUser = options.currentUser;
    this.animalsWithoutStays = options.animals.filterWithoutStays();
    this.fosterer = options.model;
    this.numAnimalsSelected = 0;

    var animalRosterSelectorView = new FosterPals.Views.AnimalRosterSelector({
      currentUser: this.currentUser,
      animals: this.animalsWithoutStays
    });
    this.addSubview('.animal-roster-hook', animalRosterSelectorView);
  },

  addChosenAnimal: function(event) {
    var _this = this;
    var $animalDiv = $($(event.currentTarget).children('[data-animal-id]')[0]);
    var animalId = parseInt($animalDiv.data('animal-id'));
    _this.animalsWithoutStays.getOrFetch(animalId).then(function(animal) {
      var chosenAnimalView = new FosterPals.Views.ChosenAnimal({
        model: animal
      });
      _this.numAnimalsSelected += 1;

      if (_this.numAnimalsSelected > 0) {
        $('.no-animals-for-reservation').addClass('d-none');
        $('#check-aval-btn').attr('disabled', false);
      }

      if (_this.numAnimalsSelected === _this.animalsWithoutStays.length) {
        $('.no-animals-to-select').removeClass('d-none');
      }

      FosterPals.Events.trigger('removeAnimal', animal);
      _this.addSubview('.chosen-animals-hook', chosenAnimalView);
    });
  },

  lockCheckOutInput: function(e) {
    $('#check-out')
      .val('')
      .prop('disabled', $(e.target).prop('checked'));
  },

  removeChosenAnimal: function(event) {
    var _this = this;
    var $div = $(event.currentTarget);
    var animalId = parseInt($div.data('animal-id'));
    _this.animalsWithoutStays.getOrFetch(animalId).then(function(animal) {
      _this.numAnimalsSelected -= 1;

      if (_this.numAnimalsSelected === 0) {
        $('.no-animals-for-reservation').removeClass('d-none');
        $('#check-aval-btn').attr('disabled', true);
      }
      if (_this.numAnimalsSelected !== _this.animalsWithoutStays.length) {
        $('.no-animals-to-select').addClass('d-none');
      }
      FosterPals.Events.trigger('addAnimal', animal);
      _this.removeModelSubview('.chosen-animals-hook', animal);
    });
  },

  showConfirmation: function(stays) {
    var animalRosterSelectorView = this.subviews('.animal-roster-hook');
    animalRosterSelectorView.remove();
    var confirmationView = new FosterPals.Views.Confirmation({
      collection: stays
    });
    this.addSubview('.animal-roster-hook', confirmationView);
  },

  toAnimalRoster: function() {
    Backbone.history.navigate('animal-roster', { trigger: true });
  },

  render: function() {
    var content = this.template({
      user: this.model,
      currentUser: this.currentUser,
      fosterer: this.fosterer,
      animals: this.animalsWithoutStays
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
