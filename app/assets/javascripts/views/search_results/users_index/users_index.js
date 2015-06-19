FosterPals.Views.UsersIndex = Backbone.View.extend({
  // Initialization
  className: 'users-index-view',

  template: JST['search_results/users_index/users_index'],

  initialize: function () {
    this.listenTo(this.collection, 'add remove sync', this.render);
    $(window).on('resize', this.setUsersHeight.bind(this));
  },

  setUsersHeight: function () {
    // Dynamically sized scrollable div.
    var height = this.$el.height() - this.$('.sidebar-info').innerHeight();
    this.$('.users').outerHeight(height);
  },

  // Rendering
  render: function () {
    var content = this.template({
      users: this.collection
    });
    this.$el.html(content);
    this.setUsersHeight();

    return this;
  },

  remove: function() {
    // Removes the listener for dynamically sizing the users pane.
    $(window).unbind("resize.app");
    Backbone.View.prototype.remove.call(this);
  }
});
