FosterPals.Views.AboutForm = Backbone.CompositeView.extend({
  template: JST['users/info/about_form'],

  initialize: function (options) {
    this.user = options.model;
  },

  render: function () {
    var content = this.template({user: this.user});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
