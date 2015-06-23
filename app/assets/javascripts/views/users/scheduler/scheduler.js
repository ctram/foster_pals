FosterPals.Views.UserScheduler = Backbone.CompositeView.extend({
  initialize: function (options) {

    this.currentUser = options.currentUser;

    this.profileView = new FosterPals.Views.Profile({
      model: this.model,
      viewingFromScheduler: true
    });
    this.addSubview('.row', this.profileView);

    // FIXME: dates-picker-view added 8 times even though it is only initialized once?
    this.datesPickerView = new FosterPals.Views.DatesPicker({
      currentUser: this.currentUser,
      model: this.model
    });
    this.addSubview('.dates-picker-hook', this.datesPickerView);

    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['users/scheduler/scheduler'],

  className: 'scheduler-view',

  events: {
    'click button#back-to-profile-btn': 'goToShow',
    'click button#check-aval-btn' : 'checkDates',
  },

  checkDates: function (event) {
    if (('.validation-errors-view').length !== 0 ) {
      $('.validation-errors-view').addClass('fadeOutLeftBig');
    }

    var selectedItems = $('#selector').find('.ui-selected');
    var animalIds = [];

    for (var i = 0; i < selectedItems.length; i++) {
      $item = $(selectedItems[i]);
      var animalId = $item.attr('animal_id');
      animalIds.push(parseInt(animalId));
    }

    var $checkIn = $('#check-in');
    var $checkOut = $('#check-out');

    if ($checkIn.find('input').val() === '' || ($checkOut.find('input').val() === '' && $('#indefinite-stay-checkbox:checked').length !== 1)) {
      var errors = ['Must enter check-in and check-out dates'];
      var errorsView = new FosterPals.Views.ValidationErrors({
        manualErrors: errors
      });
      this.addSubview('.dates-picker', errorsView);

      return;
    }

    if ($('#indefinite-stay-checkbox:checked').length === 1) {
      var indefiniteStay = true;
    } else {
      var indefiniteStay = false;
    }

    var checkInDate = $checkIn.data("DateTimePicker").date()._d.toLocaleString();
    var checkOutDate = $checkOut.data("DateTimePicker").date()._d.toLocaleString();

    this.stays = new FosterPals.Collections.Stays();

    successCallback = function (model, response, options) {
      var animal_id = model['animal_id'];
      var animal = FosterPals.Collections.animals.getOrFetch(animal_id);
      this.stays.add(animal);
    }.bind(this);

    errorCallback = function (model, response, options) {
      var errorsView = new FosterPals.Views.ValidationErrors({
        model: model
      });
      this.addSubview('.dates-picker', errorsView);
    }.bind(this);

    for (var i = 0; i < animalIds.length; i++) {
      animalId = animalIds[i];

      stayAttrs = {
        animal_id: animalId,
        indefinite_stay: indefiniteStay,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        org_id: CURRENT_USER_ID,
        fosterer_id: this.model.escape('id'),
        status: 'pending'
      };

      $.ajax( '/api/stays',{
        data: {stay: stayAttrs},
        method: 'post',
        dataType: 'json',
        success: successCallback,
        error: errorCallback
      });

      this.showConfirmation();
    }
  },

  goToShow: function (event) {
    var id = this.model.escape('id');
    var url = 'users/' + id;
    Backbone.history.navigate(url, {trigger: true});
  },

  render: function () {
    var content = this.template({
      model: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  showConfirmation: function () {
    animalRosterSelectorView  = this.subviews()._wrapped['.dates-picker-hook']._wrapped[0]
    this.removeSubview('.dates-picker-hook', animalRosterSelectorView);
    var confirmationView = new FosterPals.Views.Confirmation({
      collection: this.stays
    });
    this.addSubview('.dates-picker-hook', confirmationView);
  }

});
