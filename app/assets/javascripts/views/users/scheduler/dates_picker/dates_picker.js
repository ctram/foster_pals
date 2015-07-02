FosterPals.Views.DatesPicker = Backbone.CompositeView.extend({
  initialize: function (options) {
    
    this.currentUser = options.currentUser;
    this.animals = options.animals;
    this.checkOutInputToggled = false;

    var animalRosterSelectorView = new FosterPals.Views.AnimalRosterSelector({
      currentUser: this.currentUser,
      animals: this.animals
    });
    this.addSubview('.animal-roster-hook', animalRosterSelectorView);
  },

  template: JST['users/scheduler/dates_picker/dates_picker'],

  className: 'dates-picker well col-md-8',

  events: {
    'click input#indefinite-stay-checkbox' : 'lockCheckOutInput',
    'mouseenter .animal-selector-item': 'toggleAnimalItemHighlight',
    'mouseleave .animal-selector-item': 'toggleAnimalItemHighlight',
    'click .animal-selector-item': 'addChosenAnimal',
    'click .chosen-animal': 'removeChosenAnimal',
    'click .to-animal-roster-btn': 'toAnimalRoster'
  },

  addChosenAnimal: function (event) {
    var $div = $(event.currentTarget);
    var animalId = parseInt($div.attr('animal_id'));
    var animal = this.animals.getOrFetch(animalId);
    var chosenAnimalView = new FosterPals.Views.ChosenAnimal({
      model: animal
    });

    FosterPals.Events.trigger('removeAnimal', animal);
    this.addSubview('.chosen-animals-hook', chosenAnimalView);
  },

  lockCheckOutInput: function () {
    var $checkOutGroup = $('.check-out-group');
    $checkOutGroup.toggleClass('lock-check-out');
    this.toggleCheckOutInput();
  },

  render: function () {
    var content = this.template({
      user: this.model,
      currentUser: this.currentUser
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  removeChosenAnimal: function (event) {
    var $div = $(event.currentTarget);
    var animalId = parseInt($div.data('animal-id'));
    var animal = this.animals.getOrFetch(animalId);
    // TODO: left off here - code the removal of the chosen animal  - place it back into the other list.

    var chosenAnimalView = new FosterPals.Views.ChosenAnimal({
      model: animal
    });
    FosterPals.Events.trigger('addAnimal', animal);
    this.removeModelSubview('.chosen-animals-hook', animal);
  },

  showConfirmation: function (stays) {
    animalRosterSelectorView = this.subviews('.animal-roster-hook');
    animalRosterSelectorView.remove();
    var confirmationView = new FosterPals.Views.Confirmation({
      collection: stays
    });
    this.addSubview('.animal-roster-hook', confirmationView);
  },

  toAnimalRoster: function (event) {
    Backbone.history.navigate('animal-roster', {trigger: true});
  },

  toggleAnimalItemHighlight: function (event) {
    $div = $(event.currentTarget);
    $div.toggleClass('active-item');
  },

  toggleAnimalRoster: function (event) {
    $('.selector-toggler').toggleClass('display-none');
    $('.animal-roster-hook').toggleClass('display-none');
  },

  toggleCheckOutInput: function () {
    var $checkOut = $('#check-out');
    var checkOutInput = $checkOut.data("DateTimePicker");
    if (!this.checkOutInputToggled) {
      checkOutInput.disable();
    } else {
      checkOutInput.enable();
    }
    this.checkOutInputToggled = !this.checkOutInputToggled;
  },
});
