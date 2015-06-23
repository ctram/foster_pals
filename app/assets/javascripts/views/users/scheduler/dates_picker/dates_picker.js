FosterPals.Views.DatesPicker = Backbone.CompositeView.extend({
  initialize: function (options) {

    this.currentUser = options.currentUser;
    this.checkOutInputToggled = false;

    var animalRosterSelectorView = new FosterPals.Views.AnimalRosterSelector({
      currentUser: this.currentUser
    });
    this.addSubview('.animal-roster-hook', animalRosterSelectorView);
  },

  template: JST['users/scheduler/dates_picker/dates_picker'],

  className: 'dates-picker well col-md-8',

  events: {
    // 'click button#check-aval-btn' : 'checkDates',
    'click input#indefinite-stay-checkbox' : 'lockCheckOutInput',
    'click div.selector-toggler': 'toggleAnimalRoster',
    'mouseenter div.animal-selector-item': 'toggleAnimalItemHighlight',
    'mouseleave div.animal-selector-item': 'toggleAnimalItemHighlight',
    'click div.animal-selector-item': 'toggleSelectedColoring'
  },

  toggleSelectedColoring: function (event) {

    $div = $(event.currentTarget);
    $div.toggleClass('selected-item');
  },

  toggleAnimalItemHighlight: function (event) {
    $div = $(event.currentTarget);
    $div.toggleClass('active-item');
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

  toggleAnimalRoster: function () {
    // TODO: have roster close when mouseleave
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
  }

});
