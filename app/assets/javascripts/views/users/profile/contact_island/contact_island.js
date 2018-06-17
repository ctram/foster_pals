FosterPals.Views.ContactIsland = Backbone.CompositeView.extend({
  template: JST['users/profile/contact_island/contact_island'],

  events: {
    'click button.photo-upload-btn': 'addImage'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  addImage: function(e) {
    e.preventDefault();
    var image = new FosterPals.Models.Image();

    cloudinary.openUploadWidget(
      CLOUDINARY_OPTIONS,
      function(error, result) {
        debugger;
        var data = result[0];
        image.set({
          url: data.url,
          thumb_url: data.thumbnail_url,
          imageable_type: 'User',
          imageable_id: $(e.target).data('user-id'),
          image_set_id: this.imageSetId
        });

        image.save(
          {},
          {
            success: function() {
              this.model.fetch();
            }.bind(this)
          }
        );
      }.bind(this)
    );
  },

  render: function() {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
