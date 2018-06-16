FosterPals.Views.Navbar = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.router = options.router;
    document.addEventListener('submit', function(e) {
      this.invokeSearch(e);
    }.bind(this));
  },

  template: JST['navbar/navbar'],

  className: 'navbar-view',

  events: {
    'click a#sign-out-link': 'signOut',
    'click nav a': 'followLink',
    // 'submit form#location-search-form': 'invokeSearch' // using global listener in initialize to fix quirky 
    // wherein this listener is disabled after navigation to different route.
  },

  followLink: function(event) {
    $('li').removeClass('active');
    var $destLink = $(event.currentTarget);
    var $destLi = $(event.currentTarget.parentElement);
    $destLi.addClass('active');
    var dest = $destLink.attr('id');
    this.router.navigate(dest, { trigger: true });
  },

  invokeSearch: function(event) {
    event.preventDefault();

    $('li').removeClass('active');
    var search_location = $('form')
      .find('input')
      .val();

    if ($('.map-hook').length === 0) {
      this.router.search(search_location);
    } else {
      FosterPals.Events.trigger('pan', search_location);
    }
  },

  signOut: function() {
    $.ajax({
      url: '/session',
      type: 'DELETE',
      success: function() {
        window.location = '/session/new';
      }
    });
  },

  toggleLinkHighlight: function($link) {
    if ($link.hasClass('active')) {
      $link.removeClass('active');
    } else {
      $link.addClass('active');
    }
  },

  render: function() {
    var content = this.template({});
    this.$el.html(content);
    return this;
  }
});
