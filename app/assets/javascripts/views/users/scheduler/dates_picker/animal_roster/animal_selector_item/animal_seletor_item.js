FosterPals.Views.AnimalSelectorItem = Backbone.CompositeView.extend({
  template: JST['users/scheduler/dates_picker/animal_roster_selector/animal_selector_item/animal_selector_item'],

  className: 'animal-selector-item animated fadeInLeft',

  attributes: function () {
    if (this.model) {
      return {
        animal_id: this.model.escape('id')
      };
    }
    return {};
  },

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
