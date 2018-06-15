FosterPals.Views.ScheduleManagerItem = Backbone.CompositeView.extend({
  template: JST['schedule_manager/schedule_manager_item/schedule_manager_item'],

  className: 'schedule-manager-item-view p-3 mb-3',

  initialize: function(options) {
    this.org = options.org;
    this.stay = options.stay;

    var stayId = this.stay.id;

    $.ajax('/api/stays/' + stayId, {
      statusCode: {
        200: function(stay, status) {
          var animals = stay.animals;
          for (var i = 0; i < animals.length; i++) {
            var animal = new FosterPals.Models.Animal(animals[i]);
            this.addAnimalView(animal);
          }
        }.bind(this)
      }
    });

    this.listenTo(this.org, 'sync', this.render);
    this.listenTo(this.stay, 'sync', this.render);
  },

  addAnimalView: function(animal) {
    var animalItemView = new FosterPals.Views.ScheduleAnimalItem({
      model: animal
    });
    this.addSubview('.animal-item-hook', animalItemView);
  },

  render: function() {
    var content = this.template({
      org: this.org,
      stay: this.stay
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
