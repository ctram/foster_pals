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
    var selectedItems = $('#selector').find('.ui-selected');
    var animalIds = [];

    for (var i = 0; i < selectedItems.length; i++) {
      $item = $(selectedItems[i]);
      var animalId = $item.attr('animal_id');
      animalIds.push(parseInt(animalId));
    }

    var $checkIn = $('#check-in');
    var $checkOut = $('#check-out');

    var checkInDate = $checkIn.data("DateTimePicker").date()._d.toLocaleString();
    var checkOutDate = $checkOut.data("DateTimePicker").date()._d.toLocaleString();

    if ($('#indefinite-stay-checkbox:checked').length === 1) {
      var indefiniteStay = true;
    } else {
      var indefiniteStay = false;
    }

    var stays = new FosterPals.Collections.Stays();
    for (var i = 0; i < animalIds.length; i++) {
      animalId = animalIds[i];

      data = {
        animal_id: animalId,
        indefinite_stay: indefiniteStay,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        org_id: CURRENT_USER_ID,
        fosterer_id: this.model.escape('id'),
        status: 'rescued'
      };

      $.ajax( '/api/stays',{
        data: {stay: data},
        method: 'post',
        dataType: 'json',
        success: function (response) {
          stays.add(reponse);
        }
      });

      this.showConfirmation(stays);
    }


    // TODO: send info to Rails -- if indefiniteStay is true, then ignore the checkout date since it will be locked out in the app but may have a date selected before the user locked it.

    // send to rails to generate a stay resource
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
