FosterPals.Views.DatesPicker = Backbone.CompositeView.extend({
  template: JST['users/scheduler/dates_picker/dates_picker'],

  className: 'dates-picker col-md-8',

  events: {
    'click button#check-aval-btn' : 'checkDates'
  },

  checkDates: function (event) {
    var $checkIn = $('#check-in');
    //
    var $checkOut = $('#check-out');


    var checkInDate = $checkIn.data("DateTimePicker").date()._d.toLocaleString();
    var checkOutDate = $checkOut.data("DateTimePicker").date()._d.toLocaleString();


    debugger
    // send to rails to generate a stay resource
  },

  initialize: function (options) {
    this.user = options.model;
  },

  render: function () {
    var content = this.template({
      model: this.user
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;

  },

  selectDateCheckIn: function (event) {

  }

});
