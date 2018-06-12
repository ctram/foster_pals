FosterPals.Views.ContactIsland = Backbone.CompositeView.extend({
  
  template: JST['users/profile/contact_island/contact_island'],

  events: {
    'click button.photo-upload-btn': 'addImage'
  },

  initialize: function(options) {
    viewingFromScheduler = options.viewingFromScheduler;
    this.listenTo(this.model, 'sync', this.render);
  },

  addImage: function(e) {
    e.preventDefault();

    reRender = function() {
      this.render();
    }.bind(this);

    imageSaveCallback = function() {
      this.model.fetch({
        success: reRender
      });
    }.bind(this);

    cloudinaryCallback = function(error, result) {
      var data = result[0];
      image.set({
        url: data.url,
        thumb_url: data.thumbnail_url,
        imageable_id: id,
        imageable_type: 'User',
        image_set_id: this.imageSetId
      });

      image.save(
        {},
        {
          success: imageSaveCallback
        }
      );
    }.bind(this);

    var image = new FosterPals.Models.Image();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, cloudinaryCallback);
  },

  render: function() {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
