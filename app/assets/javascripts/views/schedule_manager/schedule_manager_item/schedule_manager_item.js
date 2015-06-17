FosterPals.Views.ScheduleManagerItem = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.org = options.org;
    this.stay = options.stay;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.org, 'sync', this.render);
    this.listenTo(this.org, 'sync', this.render);
  },

  template: JST['schedule_manager/schedule_manager_item/schedule_manager_item'],

  className: 'schedule-manager-item-view',

  render: function () {

    var content = this.template({
      animal: this.model,
      org: this.org,
      stay: this.stay
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
