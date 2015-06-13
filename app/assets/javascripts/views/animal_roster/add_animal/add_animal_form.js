FosterPals.Views.AddAnimalForm = Backbone.CompositeView.extend({

  template: JST['animal_roster/add_animal/add_animal_form'],

  className: 'add-animal',

  initialize: function (options) {
    this.user = options.model;
    this.images = FosterPals.Collections.addFormImages;

    var listOfImagesView = new FosterPals.Views.ListOfImages({
      collection: this.images
    });
    // FIXME: listOfImagesView not showing up in the AddAnimalForm view.
    this.addSubview('div.image-item', listOfImagesView);
    this.listenTo(this.images, 'add', this.render);
  },

  events: {
    // TODO: make all button elements have IDs instead of classes for your event listeners.
    'click button.add-animal-btn': 'addAnimal',
    'click button.add-image-btn' : 'addImage'
  },

  addAnimal: function (event) {
    // TODO add images of animals - user cloudinary
    // TODO add images of users
    var $button = $(event.target);
    var $form = $button.closest('form');
    var animal = $form.serializeJSON();
    var attrs = animal.animal;
    $.ajax(
      '/api/animals',
      {
        data: animal,
        method: 'POST',
        success: function () {
          var animal = new FosterPals.Models.Animal(attrs);
          this.animals.add(animal, {merge: true});
        }.bind(this)
      }
    );

  },

  addImage: function(e){
    // TODO: add a subview upon upload of image
    var id = parseInt(this.user.escape('id'));
    var image = new FosterPals.Models.Image();
    e.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result){
      var data = result[0];
      image.set({
        url: data.url,
        thumb_url: data.thumbnail_url,
        owner_id: id
      });
      image.save({}, {
        success: function(){
          FosterPals.Collections.addFormImages.add(image);
        }
      });
    });
  },

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },
});

FosterPals.Collections.addFormImages = new FosterPals.Collections.Images();
