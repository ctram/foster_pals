FosterPals.Views.Island = Backbone.CompositeView.extend({
  template: JST['users/profile/island'],

  className: 'island',

  initialize: function (options) {
    this.user = options.model;
    this.listenTo(this.user, 'sync', this.render);

  },

  render: function () {
    var content = this.template({user: this.user});
    this.$el.html(content);
    return this;
  }
});
