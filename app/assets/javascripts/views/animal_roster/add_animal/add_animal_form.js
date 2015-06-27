FosterPals.Views.AddAnimalForm = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.user = options.model;
    this.animals = options.animals;
    this.imageSetId = randomString(25, 'aA#');

    this.images = FosterPals.Collections.addFormImages;

    var listOfImagesView = new FosterPals.Views.ListOfImages({
      collection: this.images
    });
    this.addSubview('div.image-list', listOfImagesView);
    this.listenTo(this.images, 'add', this.render);
  },

  template: JST['animal_roster/add_animal/add_animal_form'],

  className: 'add-animal-form-view',

  events: {
    // TODO: make all button elements have IDs instead of classes for your event listeners.
    'click button.add-animal-btn': 'addAnimal',
    'click button.add-image-btn' : 'addImage'
  },

  addAnimal: function (event) {
    event.preventDefault();

    var errorsView = this.subviews('.errors-hook')._wrapped[0];
    if (errorsView) {
      $('.validation-error').addClass('fadeOutLeftBig');
      setTimeout(function () {
        this.removeSubview('.errors-hook', errorsView);
      }.bind(this), 1000);
    }

    var $button = $(event.target);
    var $form = $button.closest('form');
    var animal = $form.serializeJSON();
    var attrs = animal.animal;
    attrs.image_set_id = this.imageSetId;

    successCallback = function (model, response, options) {
      var animal = new FosterPals.Models.Animal(attrs);
      this.animals.add(animal, {merge:  true});
      location.reload(true);
    }.bind(this);

    errorCallback = function (response, responseText, options) {
      var errorsView = new FosterPals.Views.ValidationErrors({
        response: response
      });
      this.addSubview('.errors-hook', errorsView, 'prepend');
    }.bind(this);

    $.ajax(
      '/api/animals',
      {
        data: animal,
        method: 'POST',
        // TODO: newly added animal not showing up in the roster immediately.
        success: successCallback,
        error: errorCallback
      }
    );
  },

  addImage: function(e){
    // TODO: right now, when an image is uploaded - it is immediately saved to the database - perhaps delete the images if the animal does not end up being saved.
    // TODO: Right now the whole page refreshes when an image is upload, losing all previously inputted data. If the user than saves, no animal will be added.

    var image = new FosterPals.Models.Image();
    e.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result){
      var data = result[0];
      image.set({
        url: data.url,
        thumb_url: data.thumbnail_url,
        imageable_id: id,
        image_set_id: this.imageSetId
      });
      image.save({}, {
        success: function(){
          FosterPals.Collections.addFormImages.add(image);
        }
      });
    }.bind(this));
  },

  render: function () {
    var content = this.template({imageSetId: this.imageSetId});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});

FosterPals.Collections.addFormImages = new FosterPals.Collections.Images();
