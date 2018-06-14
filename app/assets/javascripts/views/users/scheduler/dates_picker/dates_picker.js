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
    this.animals = options.animals;
    this.fosterer = options.model;
    this.checkOutInputToggled = false;
    this.animalsAdded = 0;

    var animalRosterSelectorView = new FosterPals.Views.AnimalRosterSelector({
      currentUser: this.currentUser,
      animals: this.animals
    });
    this.addSubview('.animal-roster-hook', animalRosterSelectorView);
  },

  addChosenAnimal: function(event) {
    var $div = $(event.currentTarget);
    var animalId = parseInt($div.attr('animal_id'));
    var animal = this.animals.getOrFetch(animalId);
    var chosenAnimalView = new FosterPals.Views.ChosenAnimal({
      model: animal
    });

    this.animalsAdded += 1;

    if (this.animalsAdded > 0) {
      $('.chosen-animals-container').removeClass('d-none');
      $('#check-aval-btn').attr('disabled', false);
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
    var animal = this.animals.getOrFetch(animalId);
    this.animalsAdded -= 1;

    if (this.animalsAdded === 0) {
      $('.chosen-animals-container').addClass('d-none');
      $('#check-aval-btn').attr('disabled', true);
    }

    var chosenAnimalView = new FosterPals.Views.ChosenAnimal({
      model: animal
    });
    FosterPals.Events.trigger('addAnimal', animal);
    this.removeModelSubview('.chosen-animals-hook', animal);
  },

  showConfirmation: function(stays) {
    animalRosterSelectorView = this.subviews('.animal-roster-hook');
    animalRosterSelectorView.remove();
    var confirmationView = new FosterPals.Views.Confirmation({
      collection: stays
    });
    this.addSubview('.animal-roster-hook', confirmationView);
  },

  toAnimalRoster: function(event) {
    Backbone.history.navigate('animal-roster', { trigger: true });
  },

  toggleAnimalRoster: function(event) {
    $('.selector-toggler').toggleClass('display-none');
    $('.animal-roster-hook').toggleClass('display-none');
  },

  toggleCheckOutInput: function() {
    var $checkOut = $('#check-out');
    var checkOutInput = $checkOut.data('DateTimePicker');
    if (!this.checkOutInputToggled) {
      checkOutInput.disable();
    } else {
      checkOutInput.enable();
    }
    this.checkOutInputToggled = !this.checkOutInputToggled;
  },

  render: function() {
    var content = this.template({
      user: this.model,
      currentUser: this.currentUser,
      fosterer: this.fosterer,
      animals: this.animals
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
