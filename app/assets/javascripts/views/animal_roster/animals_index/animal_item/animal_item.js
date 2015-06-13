FosterPals.Views.AnimalItem = Backbone.CompositeView.extend({

  template: JST['animal_roster/animals_index/animal_item/animal_item'],

  className: 'li',

  initialize: function (options) {

  },

  render: function () {
    var content = this.template({animal: this.model});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
