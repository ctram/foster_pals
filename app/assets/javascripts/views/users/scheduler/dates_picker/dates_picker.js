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
    var $animalDiv = $($(event.currentTarget).children('[data-animal-id]')[0]);
    var animalId = parseInt($animalDiv.data('animal-id'));
    var animal = this.animalsWithoutStays.getOrFetch(animalId);
    var chosenAnimalView = new FosterPals.Views.ChosenAnimal({
      model: animal
    });

    this.numAnimalsSelected += 1;

    if (this.numAnimalsSelected > 0) {
      $('.no-animals-for-reservation').addClass('d-none');
      $('#check-aval-btn').attr('disabled', false);
    }

    if (this.numAnimalsSelected === this.animalsWithoutStays.length) {
      $('.no-animals-to-select').removeClass('d-none');
    }

    FosterPals.Events.trigger('removeAnimal', animal);
    this.addSubview('.chosen-animals-hook', chosenAnimalView);
  },

  lockCheckOutInput: function() {
    var $checkOutGroup = $('.check-out-group');
    $checkOutGroup.toggleClass('lock-check-out');
    this.toggleCheckOutInput();
  },

  removeChosenAnimal: function(event) {
    var $div = $(event.currentTarget);
    var animalId = parseInt($div.data('animal-id'));
    var animal = this.animalsWithoutStays.getOrFetch(animalId);
    this.numAnimalsSelected -= 1;

    if (this.numAnimalsSelected === 0) {
      $('.no-animals-for-reservation').removeClass('d-none');
      $('#check-aval-btn').attr('disabled', true);
    }
    if (this.numAnimalsSelected !== this.animalsWithoutStays.length) {
      $('.no-animals-to-select').addClass('d-none');
    }
    FosterPals.Events.trigger('addAnimal', animal);
    this.removeModelSubview('.chosen-animals-hook', animal);
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

  toggleCheckOutInput: function() {
    var $checkOutInput = $('#check-out');
    $checkOutInput.prop('disabled', $checkOutInput.prop('disabled'));
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
