FosterPals.Views.ScheduleManagerItem = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['schedule_manager/schedule_manager_item/schedule_manager_item'],

  className: 'schedule-manager-item-view',

  render: function () {
    var content = this.template({animal: this.model});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
