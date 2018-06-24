FosterPals.Views.AnimalItem = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.animal = options.animal;
    this.stays = options.stays;
    this.fosterer = options.fosterer;
    this.stay = options.stay;
    this.org = options.org;
    this.listenTo(this.fosterer, 'sync', this.render);
  },

  template: JST['animal_roster/animals_index/animal_item/animal_item'],

  className: 'animal-item-view item-view p-3',

  render: function () {
    var content = this.template({
      animal: this.animal,
      fosterer: this.fosterer,
      stays: this.stays,
      org :this.org

    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
});