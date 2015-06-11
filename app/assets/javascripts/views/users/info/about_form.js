FosterPals.Views.AboutForm = Backbone.CompositeView.extend({
  template: JST['users/info/about_form'],

  initialize: function (options) {
    this.user = options.model;
  },

  // events: {
  //   "click button.about-info-save-btn": "updateAboutInfo"
  // },
  //
  // updateAboutInfo: function(event){
  //   event.preventDefault();
  //
  //   var $form = $(this.$el).find('form');
  //   var aboutInfoData = $form.serializeJSON();
  //   this.user.set(aboutInfoData);
  //   this.user.save({}, {
  //     success: function () {
  //       this.remove
  //     }
  //   });
  // },

  render: function () {
    var content = this.template({user: this.user});
    this.$el.html(content);
    // this.attachSubviews();
    return this;
  }
});
