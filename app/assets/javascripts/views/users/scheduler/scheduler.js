FosterPals.Views.UserScheduler = Backbone.CompositeView.extend({
  template: JST['users/scheduler/scheduler'],

  className: 'scheduler-view',

  events: {
    'click button#back-to-profile-btn': 'goToShow',
    'click button#check-aval-btn': 'checkDates'
  },

  initialize: function(options) {
    this.currentUser = options.currentUser;
    this.animals = options.animals;

    this.datesPickerView = new FosterPals.Views.DatesPicker({
      currentUser: this.currentUser,
      model: this.model,
      animals: this.animals
    });
    this.addSubview('.dates-picker-hook', this.datesPickerView);
    this.listenTo(this.model, 'sync', this.render);
  },

  checkDates: function() {
    var selectedAnimals = $('.chosen-animal');
    var animalIds = [];

    if (selectedAnimals.length === 0) {
      if ($('.no-animals-selected-err').length > 0) {
        return;
      }
      $err = $('<div>').addClass('no-animals-selected-err');
      $err.text('You must choose at least one pet to make a reservation for!');
      $('#check-aval-btn').append($err);

      return;
    }

    for (var i = 0; i < selectedAnimals.length; i++) {
      $item = $(selectedAnimals[i]);
      var animalId = $item.data('animal-id');

      animalIds.push(parseInt(animalId));
    }

    var $checkIn = $('#check-in');
    var $checkOut = $('#check-out');

    var checkInEmptyBool = $checkIn.find('input').val() === '';
    var checkOutEmptyBool = $checkOut.find('input').val() === '';
    var indefiniteStayBool = $('#indefinite-stay-checkbox:checked').length !== 1;

    if (checkInEmptyBool || (checkOutEmptyBool && indefiniteStayBool)) {
      var errors = ['Must enter check-in and check-out dates'];
      var errorsView = new FosterPals.Views.ValidationErrors({
        manualErrors: errors,
        view: 'dates-picker'
      });
      this.addSubview('.dates-picker', errorsView);

      return;
    }

    var checkInDate = $checkIn
      .data('DateTimePicker')
      .date()
      ._d.toLocaleString();

    if ($('#indefinite-stay-checkbox:checked').length === 1) {
      var checkOutDate = '';
    } else {
      var checkOutDate = $checkOut
        .data('DateTimePicker')
        .date()
        ._d.toLocaleString();
    }

    this.animals = new FosterPals.Collections.Animals();

    successCallback = function(model) {
      var animalId = model['id'];
      // var animal_id = model['animal_id'];
      var animal = FosterPals.Collections.animals.getOrFetch(animalId);
      this.animals.add(animal);
    }.bind(this);

    errorCallback = function(model) {
      var errorsView = new FosterPals.Views.ValidationErrors({
        model: model,
        view: 'dates-picker'
      });
      this.addSubview('.dates-picker', errorsView);
    }.bind(this);

    this.reservations = new FosterPals.Collections.Reservations();

    resSuccessCallback = function(model) {
      this.reservations.add(model);
    }.bind(this);

    var animalId;
    var checkOutDate;

    for (var i = 0; i < animalIds.length; i++) {
      animalId = animalIds[i];

      // TODO: animals are being reserved as separate stays even when they are of the same dates -- a stay should have multiple animals - right now a stay has one animal - when multiple animals are being reserved, they are each getting a separate stay.

      resAttrs = {
        animal_id: animalId
      };

      $.ajax('api/reservations', {
        method: 'post',
        data: { reservation: resAttrs },
        dataType: 'json',
        success: resSuccessCallback
      });
    }

    setTimeout(
      function() {
        var reservations = [];
        var res;

        for (var i = 0; i < this.reservations.length; i++) {
          res = this.reservations.models[i].attributes;
          reservations.push(res);
        }

        stayAttrs = {
          reservations: reservations,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          org_id: CURRENT_USER_ID,
          fosterer_id: this.model.escape('id'),
          status: 'pending'
        };

        // TODO: should be ajax to make reservations with an empty stay.
        $.ajax('/api/stays', {
          data: { stay: stayAttrs },
          method: 'post',
          dataType: 'json',
          success: successCallback,
          error: errorCallback
        });

        // TODO: ajax to create stay
        this.showConfirmation();
      }.bind(this),
      1000
    );
  },

  goToShow: function() {
    var id = this.model.escape('id');
    var url = 'users/' + id;
    Backbone.history.navigate(url, { trigger: true });
  },

  showConfirmation: function() {
    animalRosterSelectorView = this.subviews()._wrapped['.dates-picker-hook']._wrapped[0];
    this.removeSubview('.dates-picker-hook', animalRosterSelectorView);
    var confirmationView = new FosterPals.Views.Confirmation({
      collection: this.reservations
    });
    this.addSubview('.dates-picker-hook', confirmationView);
  },

  render: function() {
    var content = this.template({
      model: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
