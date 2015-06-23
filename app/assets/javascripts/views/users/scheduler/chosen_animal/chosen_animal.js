FosterPals.Views.ChosenAnimal = Backbone.CompositeView.extend({
  initialize: function (options) {

  },

  template: JST['users/scheduler/dates_picker/chosen_animal/chosen_animal'],

  className: 'chosen-animals-view',

  events: {
  },

  render: function () {
    var content = this.template({
      animal: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
});
