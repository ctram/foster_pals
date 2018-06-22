FosterPals.Views.ProfilePhoto = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['users/profile/profile_photo/profile_photo'],

  className: 'profile-photo-view',

  render: function () {
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
