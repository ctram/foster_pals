FosterPals.Views.AnimalItem = Backbone.CompositeView.extend({

  template: JST['animal_roster/animals_index/animal_item/animal_item'],

  className: 'animal-item-view row animated',

  initialize: function (options) {
    debugger
    this.animal = options.animal;
    this.fosterer = options.fosterer;
    this.stay = options.stay;
    this.org = options.org;
    this.listenTo(this.fosterer, 'sync', this.render);
  },

  render: function () {
      debugger

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
