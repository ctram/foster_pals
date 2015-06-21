FosterPals.Views.AnimalItem = Backbone.CompositeView.extend({

  template: JST['animal_roster/animals_index/animal_item/animal_item'],

  className: 'animal-item-view row animated',

  initialize: function (options) {
    this.fosterer = options.fosterer;
    this.listenTo(this.fosterer, 'sync', this.render);
  },

  render: function () {


    var content = this.template({
      animal: this.model,

    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },
});
