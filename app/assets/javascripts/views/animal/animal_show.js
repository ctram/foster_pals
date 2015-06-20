FosterPals.Views.AnimalShow = Backbone.CompositeView.extend({
  initialize: function (options) {
    var profileView = new FosterPals.Views.AnimalProfile({
      model: this.model
    });

    var images = this.model.images();
    var imageGalleryView = new FosterPals.Views.ImageGallery({
      model: this.model,
      images: images
    });

    this.addSubview('.profile-hook', profileView);
    this.addSubview('.image-gallery-hook', imageGalleryView);
  },

  template: JST['animals/animal_show'],

  className: 'animal-show-view',

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },



});
