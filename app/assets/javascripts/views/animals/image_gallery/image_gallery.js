FosterPals.Views.ImageGallery = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.animal = this.model;
    this.images = options.images;
    this.listenTo(this.animal, 'sync', this.render)
    this.listenTo(this.images, 'sync', this.render)
  },

  template: JST['animals/image_gallery/image_gallery'],

  className: 'image-gallery-view text-center',


  render: function () {

    var content = this.template({
      animal: this.model,
      images: this.images
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
