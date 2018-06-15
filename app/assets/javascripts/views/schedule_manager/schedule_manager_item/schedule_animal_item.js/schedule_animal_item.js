FosterPals.Views.ScheduleAnimalItem = Backbone.CompositeView.extend({
  template: JST['schedule_manager/schedule_manager_item/schedule_animal_item/schedule_animal_item'],

  className: 'animal-with-res',

  initialize: function(options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({
      animal: this.model
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
