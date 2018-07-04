FosterPals.Views.ChosenAnimal = Backbone.CompositeView.extend({
  template: JST['users/scheduler/dates_picker/chosen_animal/chosen_animal'],

  className: 'chosen-animals-view mb-3 item-view',

  events: {},

  initialize: function(options) {
    this.animals = options.animals;
  },

  render: function() {
    var content = this.template({
      animal: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
