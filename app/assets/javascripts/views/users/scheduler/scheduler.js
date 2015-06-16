FosterPals.Views.UserScheduler = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.currentUser = options.currentUser;

    this.profileView = new FosterPals.Views.Profile({
      model: this.model,
      viewingFromScheduler: true
    });
    this.addSubview('.row', this.profileView);

    this.datesPickerView = new FosterPals.Views.DatesPicker({
      currentUser: this.currentUser,
      model: this.model
    });
    this.addSubview('.row', this.datesPickerView);

    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['users/scheduler/scheduler'],

  className: 'scheduler-view',

  events: {
    'click button#back-to-profile-btn': 'goToShow',
    'click button#check-aval-btn' : 'checkDates',
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

    this.stays = new FosterPals.Collections.Stays();
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
        success: function (response) {
          var animal_id = response['animal_id'];
          var animal = FosterPals.Collections.animals.getOrFetch(animal_id);
          this.stays.add(animal);
        }.bind(this)
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
    animalRosterSelectorView = this.subviews('.row')['_wrapped'][1];
    this.removeSubview('.row', animalRosterSelectorView);
    var confirmationView = new FosterPals.Views.Confirmation({
      collection: this.stays
    });
    this.addSubview('.row', confirmationView);
  }

});
