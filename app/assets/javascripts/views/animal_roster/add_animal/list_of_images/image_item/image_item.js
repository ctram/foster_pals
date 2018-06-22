FosterPals.Views.ImageItem = Backbone.CompositeView.extend({
  template: JST['animal_roster/add_animal/list_of_images/image_item/image_item'],

  className: 'image-item',

  initialize: function() {},

  events: {},

  render: function() {
    var content = this.template({
      image: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
