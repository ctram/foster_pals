FosterPals.Views.ProfilePhoto = Backbone.CompositeView.extend({
  template: JST['users/profile/profile_photo/profile_photo'],

  className: 'profile-photo-view',

  events: {
    'click button.photo-upload-btn': 'addImage'
  },

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
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
        owner_id: id,
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
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
