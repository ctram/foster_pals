FosterPals.Views.AboutForm = Backbone.CompositeView.extend({
  template: JST['users/about/about_subs/about_form'],

  initialize: function(options) {
    this.user = options.model;
    this.listenTo(this.user, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ user: this.user });
    this.$el.html(content);
    return this;
  }
});
