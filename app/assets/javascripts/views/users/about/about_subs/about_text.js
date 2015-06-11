FosterPals.Views.AboutText = Backbone.CompositeView.extend({
  template: JST['users/about/about_subs/about_text'],

  initialize: function (options) {
    this.user = options.model;
    this.listenTo(this.user, 'sync change', this.render);
  },

  render: function () {
    var content = this.template({user: this.user});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
