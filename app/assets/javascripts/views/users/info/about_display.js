FosterPals.Views.AboutDisplay = Backbone.CompositeView.extend({
  template: JST['users/info/about_display'],

  initialize: function (options) {
    this.user = options.model;
    this.listenTo(this.user, 'sync', this.render);
  },

  render: function () {
    var content = this.template({user: this.user});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
