FosterPals.Views.ScheduleAnimalItem = Backbone.CompositeView.extend({
  initialize: function (options) {
    // FIXME: fetch is never getting to success callback, even though the fetch seems to have worked.
    debugger
    this.listenTo(this.model, 'sync', this.render)
  },

  template: JST['schedule_manager/schedule_manager_item/animal_item/animal_item'],

  className: 'animal-item-view row',

  render: function () {

    var content = this.template({
      animal: this.model
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
