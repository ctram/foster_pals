window.FosterPals = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  SearchResults: {},
  UserId: null,
  Events: {},
  map: {},
  views: [],
  state: { tourOn: false, tourStep: 0, mapFirstVisit: true },
  moveTourForward: function() {
    FosterPals.state.tourStep++;
    FosterPals.views.searchResults.render();
    FosterPals.views.navbar.render();
  },
  shutdownTour: function() {
    if (!FosterPals.state.tourOn) {
      return;
    }
    FosterPals.state.tourOn = false;
    FosterPals.views.navbar.render();
  },
  initialize: function() {
    window.$ = jQuery;
    window.cloudinary = cloudinary;
    var currentUser = FosterPals.Collections.users.getOrFetch(CURRENT_USER_ID);
    var router = new FosterPals.Routers.Router({
      $rootEl: jQuery('.app-container'),
      users: FosterPals.Collections.users,
      currentUser: currentUser
    });
    window.FosterPals.router = router;
    FosterPals.views.navbar = new FosterPals.Views.Navbar({
      router: router
    });
    jQuery('.navbar-hook').html(FosterPals.views.navbar.render().$el);
    _.extend(FosterPals.Events, Backbone.Events);
    Backbone.history.start();
  },
  helpers: {
    randomString: function(length, chars) {
      var mask = '';
      if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
      if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (chars.indexOf('#') > -1) mask += '0123456789';
      if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
      var result = '';
      for (var i = length; i > 0; --i)
        result += mask[Math.round(Math.random() * (mask.length - 1))];
      return result;
    }
  }
};
