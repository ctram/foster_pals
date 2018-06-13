FosterPals.Views.ListOfImages = Backbone.CompositeView.extend({
  template: JST['animal_roster/add_animal/list_of_images/list_of_images'],

  className: 'uploaded-animal-images',

  events: {},

  initialize: function(options) {
    this.user = options.model;
    this.listenTo(this.collection, 'add', this.addImageItemView);
  },

  addImageItemView: function(model) {
    var imageItemView = new FosterPals.Views.ImageItem({
      model: model
    });
    this.addSubview('ul.list-of-images', imageItemView);
  },


  render: function() {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
