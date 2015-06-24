FosterPals.Views.DatesPicker = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.currentUser = options.currentUser;
    this.animals = options.animals;
    this.checkOutInputToggled = false;

    var animalRosterSelectorView = new FosterPals.Views.AnimalRosterSelector({
      currentUser: this.currentUser
    });
    this.addSubview('.animal-roster-hook', animalRosterSelectorView);
  },

  template: JST['users/scheduler/dates_picker/dates_picker'],

  className: 'dates-picker well col-md-8',

  events: {
    'click input#indefinite-stay-checkbox' : 'lockCheckOutInput',
    'mouseenter .animal-selector-item': 'toggleAnimalItemHighlight',
    'mouseleave .animal-selector-item': 'toggleAnimalItemHighlight',
    // 'click .animal-selector-item': 'addChosenAnimals',
    'click .animal-selector-item': 'toggleSelectAnimal'
  },

  addChosenAnimals: function (event) {
    var $selected = $('#selector').find('.selected');
    var numSelected = $selected.length;

    if (numSelected > 0 ) {
      for (var i = 0; i < numSelected; i++) {
        var $animal = $($selected[i]);
        var animalId = parseInt($animal.attr('animal_id'));
        var animal = this.animals.get(animalId);
        var chosenAnimalView = new FosterPals.Views.ChosenAnimal({
          model: animal
        });
        this.addSubview('.chosen-animals-hook', chosenAnimalView);
        FosterPals.Events.trigger('removeAnimal', event);
      }
    }

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


  showConfirmation: function (stays) {
    animalRosterSelectorView = this.subviews('.animal-roster-hook');
    animalRosterSelectorView.remove();
    var confirmationView = new FosterPals.Views.Confirmation({
      collection: stays
    });
    this.addSubview('.animal-roster-hook', confirmationView);
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
    // TODO: ask Laura for slides about resume
      checkOutInput.disable();
    } else {
      checkOutInput.enable();
    }
    this.checkOutInputToggled = !this.checkOutInputToggled;
  },

  toggleSelectAnimal: function (event) {
    $div = $(event.currentTarget);
    $div.addClass('selected');

    this.addChosenAnimals(event);
  }
});
