window.FosterPals = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new FosterPals.Routers.Router({
      $rootEl: $('#content')
    });
    var navbarView = new FosterPals.Views.Navbar({
      router: router
    });
    $('.navbar-wrapper').html(navbarView.render().$el);
  }
};

if (window.location.pathname !== '/') {
  $(document).ready(function(){
    FosterPals.initialize();
  });
}
