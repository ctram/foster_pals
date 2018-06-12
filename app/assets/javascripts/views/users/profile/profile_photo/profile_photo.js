FosterPals.Views.ProfilePhoto = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.imageSetId = randomString(25, 'aA#');

  },

  template: JST['users/profile/profile_photo/profile_photo'],

  className: 'profile-photo-view',

  events: {
    'click button.photo-upload-btn': 'addImage'
  },

  addImage: function(e){
    // TODO: right now, when an image is uploaded - it is immediately saved to the database - perhaps delete the images if the animal does not end up being saved.
    // TODO: Right now the whole page refreshes when an image is upload, losing all previously inputted data. If the user than saves, no animal will be added.

    // callback after image has been uploaded to immediately place image into the profile.
    e.preventDefault();

    reRender = function () {
      this.render();
    }.bind(this);

    imageSaveCallback = function () {
      this.model.fetch({
        success: reRender
      });
    }.bind(this);

    cloudinaryCallback = function (error, result) {
      var data = result[0];
      image.set({
        url: data.url,
        thumb_url: data.thumbnail_url,
        imageable_id: id,
        imageable_type: 'User',
        image_set_id: this.imageSetId
      });

      image.save({}, {
        success: imageSaveCallback
      });
    }.bind(this);

    var image = new FosterPals.Models.Image();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, cloudinaryCallback);
  },

  render: function () {
    // this.model.attributes.main_image_thumb_url = this.ensureImage();
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
