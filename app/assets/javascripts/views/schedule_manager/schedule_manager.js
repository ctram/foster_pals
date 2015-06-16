FosterPals.Views.ScheduleManager = Backbone.CompositeView.extend({
  initialize: function (options) {
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
