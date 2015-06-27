FosterPals.Views.ScheduleManagerItem = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.org = options.org;
    this.stay = options.stay;

    var stayId = this.stay.id;


    $.ajax('/api/stays/' + stayId, {
      statusCode: {
        200: function(stay, status) {
          var animals = stay.animals;
          for (var i = 0; i < animals.length; i++) {
            var animal = new FosterPals.Models.Animal(
              animals[i]
            );

            this.addAnimalView(animal);
          }
        }.bind(this)
      }
    });

    // this.stay.fetch({
    //   success: function (model, response, options) {
    //
    //   }.bind(this),
    //   statusCode: {
    //     304: function() {
    //
    //       var animals = this.stay.animals();
    //       for (var i = 0; i < animals.length; i++) {
    //         this.addAnimalView(animals[i]);
    //       }
    //     }.bind(this),
    //     404: function () {
    //
    //     }
    //   }
    // });

    // var animals = this.stay.animals();
    //
    // for (var i = 0; i < animals.length; i++) {
    //   this.addAnimalView(animals.models[i]);
    // }


    // TODO: a stay now has many animals - here, call stay.animals() and pull in the animals - iterate through the list of animals and add a line item for each animal.

    this.listenTo(this.org, 'sync', this.render);
    this.listenTo(this.stay, 'sync', this.render);
  },


  template: JST['schedule_manager/schedule_manager_item/schedule_manager_item'],

  className: 'schedule-manager-item-view',

  addAnimalView: function (animal) {
    debugger
    var animalItemView = new FosterPals.Views.ScheduleAnimalItem({
      model: animal
    });
    this.addSubview('.animal-item-hook', animalItemView);
  },

  render: function () {
    // TODO: re-do seed data, right now there is a stay associated with a user 7, but there is no user 7.

    var content = this.template({
      org: this.org,
      stay: this.stay
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
