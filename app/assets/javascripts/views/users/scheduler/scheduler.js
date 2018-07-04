FosterPals.Views.UserScheduler = Backbone.CompositeView.extend({
  template: JST['users/scheduler/scheduler'],

  className: 'scheduler-view',

  events: {
    'click button#back-to-profile-btn': 'goToShow',
    'click button#check-aval-btn': 'checkDates'
  },

  initialize: function(options) {
    this.currentUser = options.currentUser;

    this.datesPickerView = new FosterPals.Views.DatesPicker({
      currentUser: this.currentUser,
      model: this.model,
    });
    this.addSubview('.dates-picker-hook', this.datesPickerView);
    this.listenTo(this.model, 'sync', this.render);
  },

  validateDatesNotEmpty: function(checkInDate, checkOutDate, indefiniteStay) {
    if (!Date.parse(checkInDate)) {
      return 'Check-in date cannot be empty';
    }
    if (!indefiniteStay && !Date.parse(checkOutDate)) {
      return 'Check-out date cannot be empty';
    }
  },

  validateDatesInOrder: function(checkInDate, checkOutDate, indefiniteStay) {
    if (!indefiniteStay && checkOutDate < checkInDate) {
      return 'Check-in date must precede check-out date';
    }
  },

  validateSelectedAnimals: function() {
    var selectedAnimals = $('.chosen-animal');
    if (selectedAnimals.length === 0) {
      return 'Must choose at least one pet to make a reservation for.';
    }
  },

  validate: function(checkInDate, checkOutDate, indefiniteStay) {
    return (
      this.validateDatesNotEmpty(checkInDate, checkOutDate, indefiniteStay) ||
      this.validateDatesInOrder(checkInDate, checkOutDate, indefiniteStay) ||
      this.validateSelectedAnimals()
    );
  },

  checkDates: function() {
    var _this = this;
    var selectedAnimals = $('.chosen-animal');
    var animalIds = [];
    var checkInDate = new Date($('#check-in').val());
    var checkOutDate = new Date($('#check-out').val());
    var indefiniteStay = $('#indefinite-stay-checkbox').prop('checked');
    var error = _this.validate(checkInDate, checkOutDate, indefiniteStay);

    if (error) {
      return toastr.error(error);
    }

    for (var i = 0; i < selectedAnimals.length; i++) {
      var $item = $(selectedAnimals[i]);
      var animalId = $item.data('animal-id');
      animalIds.push(parseInt(animalId));
    }

    checkInDate = checkInDate.toISOString();

    if (indefiniteStay) {
      checkOutDate = '';
    } else {
      checkOutDate = checkOutDate.toISOString();
    }

    _this.reservations = new FosterPals.Collections.Reservations();

    var reservationPromises = [];

    for (i = 0; i < animalIds.length; i++) {
      animalId = animalIds[i];

      reservationPromises.push(
        $.ajax('api/reservations', {
          method: 'post',
          data: {
            reservation: {
              animal_id: animalId
            }
          },
          dataType: 'json',
          success: function(model) {
            _this.reservations.add(model);
            _this.currentUser.fetch();
          }
        })
      );
    }

    Promise.all(reservationPromises)
      .then(function() {
        var reservations = [];
        var res;

        for (var i = 0; i < _this.reservations.length; i++) {
          res = _this.reservations.models[i].attributes;
          reservations.push(res);
        }

        // TODO: should be ajax to make reservations with an empty stay.
        return $.ajax('/api/stays', {
          data: {
            stay: {
              reservations: reservations,
              check_in_date: checkInDate,
              check_out_date: checkOutDate,
              org_id: CURRENT_USER_ID,
              fosterer_id: _this.model.escape('id'),
              status: 'pending'
            }
          },
          method: 'post',
          dataType: 'json',
          success: function(model) {
          },
          error: function(res) {
            toastr.error(res.responseText);
          }
        });
      })
      .then(function() {
        return _this.showConfirmation();
      });
  },

  goToShow: function() {
    var id = this.model.escape('id');
    var url = 'users/' + id;
    Backbone.history.navigate(url, { trigger: true });
  },

  showConfirmation: function() {
    var animalRosterSelectorView = this.subviews()._wrapped['.dates-picker-hook']._wrapped[0];
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
