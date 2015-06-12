FosterPals.Views.AddAnimalForm = Backbone.CompositeView.extend({

  template: JST['animal_roster/add_animal/add_animal_form'],

  className: 'add-animal',

  initialize: function (options) {
  },

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },



});
