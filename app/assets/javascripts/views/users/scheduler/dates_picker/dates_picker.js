FosterPals.Views.DatesPicker = Backbone.CompositeView.extend({
  template: JST['users/scheduler/dates_picker/dates_picker'],

  className: 'dates-picker well col-md-8',

  events: {
    'click button#check-aval-btn' : 'checkDates',
    'click input#indefinite-stay-checkbox' : 'lockCheckOutInput',
    'click div.selector-toggler': 'toggleAnimalRoster',
    'mouseenter div.animal-selector-item': 'toggleAnimalItemHighlight',
    'mouseleave div.animal-selector-item': 'toggleAnimalItemHighlight',
    'click div.animal-selector-item': 'toggleSelectedColoring'
  },

  initialize: function (options) {
    this.currentUser = options.currentUser;
    this.checkOutInputToggled = false;

    var animalRosterSelectorView = new FosterPals.Views.AnimalRosterSelector({
      currentUser: this.currentUser
    });
    this.addSubview('.animal-roster-hook', animalRosterSelectorView);
  },

  checkDates: function (event) {
    var $selectedItems = $('#selector').find('.ui-selected');
    var animalIds = [];
    debugger
    // for (var i = 0; i < $selectedItems.length; i++) {
    //   $item = $selectedItems[i];
    //   animalIds.push();
    // }

    var $checkIn = $('#check-in');
    //
    var $checkOut = $('#check-out');

    var checkInDate = $checkIn.data("DateTimePicker").date()._d.toLocaleString();
    var checkOutDate = $checkOut.data("DateTimePicker").date()._d.toLocaleString();
    // var attrs = {
    //   check_in_date: checkInDate,
    //   check_out_date: checkOutDate,
    //
    // }
    if ($('#indefinite-stay-checkbox:checked').length === 1) {
      var indefiniteStay = true;
    } else {
      var indefiniteStay = false;
    }
    // $.ajax( '/api/stays',{
    //   data: {chec}
    // })

    // TODO: send info to Rails -- if indefiniteStay is true, then ignore the checkout date since it will be locked out in the app but may have a date selected before the user locked it.

    // TODO: add ability to for current user to select which animal the stay is being made for.

    // send to rails to generate a stay resource
  },

  toggleSelectedColoring: function (event) {
    debugger
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
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;

  },

  toggleAnimalRoster: function () {

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
