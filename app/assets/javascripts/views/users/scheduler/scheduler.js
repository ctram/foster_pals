FosterPals.Views.UserScheduler = Backbone.CompositeView.extend({
  initialize: function (options) {

    this.currentUser = options.currentUser;
    this.animals = options.animals;

    this.profileView = new FosterPals.Views.Profile({
      model: this.model,
      viewingFromScheduler: true
    });
    this.addSubview('.row', this.profileView);

    this.datesPickerView = new FosterPals.Views.DatesPicker({
      currentUser: this.currentUser,
      model: this.model,
      animals: this.animals
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
    // TODO: add validtion error when checkout date is earlier thanc

    if (('.validation-errors-view').length !== 0 ) {
      $('.validation-errors-view').addClass('fadeOutLeftBig');
    }

    var selectedAnimals = $('.chosen-animal');
    var animalIds = [];

    if (selectedAnimals.length === 0) {
      var errors = ['Must pick at least one animal'];
      var errorsView = new FosterPals.Views.ValidationErrors({
        manualErrors: errors,
        view: 'dates-picker'
      });
      this.addSubview('.dates-picker', errorsView);

      return;
    }


    for (var i = 0; i < selectedAnimals.length; i++) {
      $item = $(selectedAnimals[i]);
      var animalId = $item.data('animal-id');

      animalIds.push(parseInt(animalId));
    }

    var $checkIn = $('#check-in');
    var $checkOut = $('#check-out');

    var checkInEmptyBool = ($checkIn.find('input').val() === '');
    var checkOutEmptyBool = ($checkOut.find('input').val() === '');
    var indefiniteStayBool = ($('#indefinite-stay-checkbox:checked').length !== 1);

    if (checkInEmptyBool || (checkOutEmptyBool && indefiniteStayBool)) {
      var errors = ['Must enter check-in and check-out dates'];
      var errorsView = new FosterPals.Views.ValidationErrors({
        manualErrors: errors,
        view: 'dates-picker'
      });
      this.addSubview('.dates-picker', errorsView);

      return;
    }

    var checkInDate = $checkIn.data("DateTimePicker").date()._d.toLocaleString();

    if ($('#indefinite-stay-checkbox:checked').length === 1) {
      var indefiniteStay = true;
      var checkOutDate = '';
    } else {
      var indefiniteStay = false;
      var checkOutDate = $checkOut.data("DateTimePicker").date()._d.toLocaleString();
    }

    this.animals = new FosterPals.Collections.Animals();

    successCallback = function (model, response, options) {

      var animalId = model['id'];
      // var animal_id = model['animal_id'];
      var animal = FosterPals.Collections.animals.getOrFetch(animalId);
      this.animals.add(animal);
    }.bind(this);

    errorCallback = function (model, response, options) {
      var errorsView = new FosterPals.Views.ValidationErrors({
        model: model,
        view: 'dates-picker'
      });
      this.addSubview('.dates-picker', errorsView);
    }.bind(this);

    var animalId;
    var indefiniteStay;
    var checkOutDate;
    for (var i = 0; i < animalIds.length; i++) {
      animalId = animalIds[i];

      stayAttrs = {
        animal_id: animalId,
        // indefinite_stay: indefiniteStay,
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
        error: errorCallback,
        animalId: animalId
      });

    }

    this.showConfirmation();
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
      collection: this.animals
    });
    this.addSubview('.dates-picker-hook', confirmationView);
  }

});
