FosterPals.Views.ScheduleManager = Backbone.CompositeView.extend({
  initialize: function (options) {
    for (var i = 0; i < this.collection.models.length; i++) {
      var animal =,
    }

  },

  template: JST['schedule_manager/schedule_manager'],

  className: 'schedule-manager-view',

  render: function () {
    var content = this.template({animals: this.collection});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
