FosterPals.Collections.addFormImages = new FosterPals.Collections.Images();

FosterPals.Views.AddAnimalForm = Backbone.CompositeView.extend({
  template: JST['animal_roster/add_animal/add_animal_form'],

  className: 'add-animal-form-view',

  events: {
    'click button.add-animal-btn': 'addAnimal',
    'click button.add-image-btn': 'addImage'
  },

  initialize: function (options) {
    this.user = options.model;
    this.animals = options.animals;
    this.imageSetId = FosterPals.helpers.randomString(25, 'aA#');

    this.images = FosterPals.Collections.addFormImages;

    var listOfImagesView = new FosterPals.Views.ListOfImages({
      collection: this.images
    });
    this.addSubview('div.image-list', listOfImagesView);
    this.listenTo(this.images, 'add', this.render);
  },

  addAnimal: function(event) {
    event.preventDefault();
    if (!$('#add-animal-form')[0].checkValidity()) {
      return;
    }

    var $button = $(event.target);
    var $form = $button.closest('form');
    var animal = $form.serializeJSON();
    var attrs = animal.animal;
    attrs.image_set_id = this.imageSetId;

    $.ajax('/api/animals', {
      data: animal,
      method: 'POST',
      success: function(model) {
        var animal = new FosterPals.Models.Animal(model);
        this.animals.add(animal, { merge: true });
        location.reload(true);
      }.bind(this),
      error: function(response) {
        var errorsView = new FosterPals.Views.ValidationErrors({
          response: response
        });
        this.addSubview('.errors-hook', errorsView, 'prepend');
      }.bind(this)
    });
  },

  addImage: function(e) {
    e.preventDefault();
    cloudinary.openUploadWidget(
      CLOUDINARY_OPTIONS,
      function(error, result) {
        if (error) {
          return console.log(error.message);
        }
        var data = result[0];
        var image = new FosterPals.Models.Image({
          url: data.url,
          thumb_url: data.thumbnail_url,
          image_set_id: this.imageSetId,
          imageable_id: this.user.id
        });
        image.save(
          {},
          {
            success: function() {
              FosterPals.Collections.addFormImages.add(image);
            }
          }
        );
      }.bind(this)
    );
  },

  render: function() {
    var content = this.template({ imageSetId: this.imageSetId });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
