FosterPals.Views.ScheduleManager = Backbone.CompositeView.extend({
  initialize: function (options) {
    var stays_as_fosterer = this.model.stays_as_fosterer();
    stays_as_fosterer.each( function (stay) {
      var id = stay.get("animal_id");
      var animal = FosterPals.Collections.animals.getOrFetch(id);
      // TODO: also pass in the org (need org name) and the stay (need start and end dates)

      var scheduleManagerItemView = new FosterPals.Views.ScheduleManagerItem ({
        model: animal
      });

      if (stay.get("status") === 'fostered') {
        this.addSubview('.scheduled-animals', scheduleManagerItemView);
      } else if (stay.get("status") === 'pending') {
        this.addSubview('.pending-animals', scheduleManagerItemView);
      }
    }.bind(this));

    this.listenTo(stays_as_fosterer, 'sync', this.render);
  },

  template: JST['schedule_manager/schedule_manager'],

  className: 'schedule-manager-view',

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
