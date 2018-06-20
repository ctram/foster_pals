FosterPals.Views.UsersIndex = Backbone.CompositeView.extend({
  className: 'user-items-wrapper',

  template: JST['search_results/users_index/users_index'],

  initialize: function() {
    this.listenTo(this.collection, 'add remove sync', this.render);
    $(window).on('resize', this.setUsersHeight.bind(this));
  },
  
  remove: function() {
    // Removes the listener for dynamically sizing the users pane.
    $(window).unbind('resize.app');
    Backbone.View.prototype.remove.call(this);
  },

  setUsersHeight: function() {
    // Dynamically sized scrollable div.
    var height = this.$el.height() - this.$('.sidebar-info').innerHeight();
    this.$('.users').outerHeight(height);
  },

  showProfilePreview: function(userId) {
    var user = FosterPals.Collections.users.getOrFetch(userId);
    var profilePreviewView = new FosterPals.Views.ProfilePreview({
      model: user
    });
    this.profilePreviews.push(profilePreviewView);
    this.addSubview('.profile-preview-hook', profilePreviewView);
  },

  render: function() {
    var content = this.template({
      users: this.collection
    });
    this.$el.html(content);
    this.setUsersHeight();
    return this;
  }
});
