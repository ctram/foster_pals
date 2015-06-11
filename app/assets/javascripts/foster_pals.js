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
      currentUserId: currentUserId
    });
    var navbarView = new FosterPals.Views.Navbar({
      router: router
    });
    $('.navbar-wrapper').html(navbarView.render().$el);
    Backbone.history.start();
  }
};

// // Show signed-in navbar only if in Backbone.
// // TODO: restrict access to Backbone app to only those signed in.
// if (window.location.pathname === '/home') {
//
//   $(document).ready(function(){
//     FosterPals.initialize();
//   });
// }
