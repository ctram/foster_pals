FosterPals.Views.AboutForm = Backbone.CompositeView.extend({
  template: JST['users/info/about_form'],

  initialize: function (options) {
    this.user = options.model;
  },
  events: {
    "submit form": "updateAboutInfo"
  },
  updateAboutInfo: function(e){
    e.preventDefault();

    var $form = $(this.$El).find('form');
    var aboutInfoData = $form.serializeJSON();
    this.user.set(aboutInfoData);
    this.user.save({
    });
  },

  render: function () {
    var content = this.template({user: this.user});
    this.$el.html(content);
    // this.attachSubviews();
    return this;
  }
});
