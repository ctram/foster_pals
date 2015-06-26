FosterPals.Views.ScheduleManagerItem = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.org = options.org;
    this.stay = options.stay;


    this.stay.fetch({
      success: function (model, response, options) {
        var animals = this.stay.animals();
        for (var i = 0; i < animals.length; i++) {
          this.addAnimalView(animals[i]);
        }
      }.bind(this)
    });

    // TODO: a stay now has many animals - here, call stay.animals() and pull in the animals - iterate through the list of animals and add a line item for each animal.

    this.listenTo(this.org, 'sync', this.render);
    this.listenTo(this.stay, 'sync', this.render);
  },


  template: JST['schedule_manager/schedule_manager_item/schedule_manager_item'],

  className: 'schedule-manager-item-view',

  addAnimalView: function (animal) {
    var animalItemView = new FosterPals.Views.ScheduleAnimalItem({
      model: animal
    });
    this.subviews('.animal-item-hook', animalItemView);
  },

  render: function () {

    var content = this.template({
      org: this.org,
      stay: this.stay
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
