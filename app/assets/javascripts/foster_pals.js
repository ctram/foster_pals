window.FosterPals = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var currentUser = FosterPals.Collections.users.getOrFetch(CURRENT_USER_ID);
    var currentUserId = CURRENT_USER_ID;
    var router = new FosterPals.Routers.Router({
      $rootEl: $('#content'),
      users: FosterPals.Collections.users,
      currentUser: currentUser,
      //  TODO: remove currentUserId -- not needed because you already have currentUser -- make sure it doesn't break after the remove.
      currentUserId: currentUserId
    });
    var navbarView = new FosterPals.Views.Navbar({
      router: router
    });
    $('.navbar-wrapper').html(navbarView.render().$el);
    Backbone.history.start();
  }
};
