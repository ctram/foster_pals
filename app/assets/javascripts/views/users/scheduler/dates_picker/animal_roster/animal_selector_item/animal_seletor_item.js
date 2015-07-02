FosterPals.Views.AnimalSelectorItem = Backbone.CompositeView.extend({
  initialize: function (options) {
    debugger
  },

  template: JST['users/scheduler/dates_picker/animal_roster_selector/animal_selector_item/animal_selector_item'],

  className: 'animal-selector-item',

  attributes: function () {
    if (this.model) {
      return {
        animal_id: this.model.escape('id')
      };
    }
    return {};
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
