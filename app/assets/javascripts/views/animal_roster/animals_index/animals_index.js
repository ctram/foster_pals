FosterPals.Views.AnimalsIndex = Backbone.CompositeView.extend({

  template: JST['animal_roster/animals_index/animals_index'],

  className: 'animals-index',

  initialize: function (options) {

  },

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
