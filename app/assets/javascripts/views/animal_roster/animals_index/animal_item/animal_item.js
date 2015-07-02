FosterPals.Views.AnimalItem = Backbone.CompositeView.extend({

  template: JST['animal_roster/animals_index/animal_item/animal_item'],

  className: 'animal-item-view row animated',

  initialize: function (options) {
    this.animal = options.animal;
    this.fosterer = options.fosterer;
    // FIXME: re-write animal roster page - an animal no longer has just one stay - it can have many stays,  -- but how do you display the information on your animal roster then? should an animal have only one stay at any given time? so a one to many association? a stay has many animals, an animal has only one stay? why would an animal have many stays? it has past, present and future stays. -- just make an animal have one stay.
    this.stay = options.stay;
    this.org = options.org;
    this.listenTo(this.fosterer, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      animal: this.animal,
      fosterer: this.fosterer,
      stay: this.stay,
      org :this.org

    });
    this.$el.html(content);
    this.attachSubviews();
    counter++;
    console.log('counter: '+ counter);

    return this;
  },
});

counter = 0;
