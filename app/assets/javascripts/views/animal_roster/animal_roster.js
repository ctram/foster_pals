FosterPals.Views.AnimalRoster = Backbone.CompositeView.extend({

  template: JST['animal_roster/animal_roster'],

  className: 'animal-roster',

  initialize: function (options) {
    this.user = options.model;
  },

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },



});
