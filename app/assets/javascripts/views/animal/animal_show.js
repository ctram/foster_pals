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

  events: {
    'click button.to-animal-roster-btn': 'toAnimalRoster'
  },

  toAnimalRoster: function () {
    Backbone.history.navigate('animal-roster', {trigger: true});
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
