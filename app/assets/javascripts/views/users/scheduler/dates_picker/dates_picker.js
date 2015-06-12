FosterPals.Views.DatesPicker = Backbone.CompositeView.extend({
  template: JST['users/scheduler/dates_picker/dates_picker'],

  className: 'dates-picker col-md-8',

  events: {
    // 'click #dates-picker-check-in': 'selectDateCheckIn',
    // 'click #dates-picker-check-out': 'selectDateCheckOut'
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
