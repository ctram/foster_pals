FosterPals.Views.EditProfile = Backbone.CompositeView.extend({
  initialize: function (options) {
  },

  template: JST['users/edit_profile/edit_profile'],

  className: 'edit-profile-view',

  events: {
  },

  render: function () {
    
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

});
