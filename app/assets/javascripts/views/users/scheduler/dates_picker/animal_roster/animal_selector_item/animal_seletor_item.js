FosterPals.Views.AnimalSelectorItem = Backbone.CompositeView.extend({
  template: JST['users/scheduler/dates_picker/animal_roster_selector/animal_selector_item/animal_selector_item'],

  className: 'animal-selector-item',

  initialize: function (options) {

  },

  render: function () {

    var content = this.template({
      animal: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

});
