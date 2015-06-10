window.FosterPals = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new FosterPals.Routers.Router({
      $rootEl: $('#content'),
      fosterers: FosterPals.Collections.fosterers,
      orgs: FosterPals.Collections.organizations
    });
    var navbarView = new FosterPals.Views.Navbar({
      router: router
    });
    $('.navbar-wrapper').html(navbarView.render().$el);
  }
};

// Show signed-in navbar only if in Backbone.
// TODO: restrict access to Backbone app to only those signed in.
if (window.location.pathname !== '/') {
  $(document).ready(function(){
    FosterPals.initialize();
  });
}
