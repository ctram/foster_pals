FosterPals.Views.Island = Backbone.CompositeView.extend({
  template: JST['users/profile/island'],

  initialize: function (options) {
    this.user = options.user;
    this.listenTo(this.user, 'sync', this.render);
    ;
  },

  render: function () {
    var content = this.template({user: this.user});
    this.$el.html(content);
    return this;
  }
});
