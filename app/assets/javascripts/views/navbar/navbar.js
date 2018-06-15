FosterPals.Views.Navbar = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.router = options.router;
    this.listenTo(this.router, '', this.render);
  },

  template: JST['navbar/navbar'],

  className: 'navbar-view',

  events: {
    'click a#sign-out-link': 'signOut',
    'click nav a': 'followLink',
    'click button#search-btn': 'invokeSearch',
    'submit form': 'invokeSearch'
  },

  followLink: function(event) {
    $('li').removeClass('active');
    var $destLink = $(event.currentTarget);
    var $destLi = $(event.currentTarget.parentElement);
    $destLi.addClass('active');
    var dest = $destLink.attr('id');
    Backbone.history.navigate(dest, { trigger: true });
  },

  invokeSearch: function(event) {
    event.preventDefault();
    $('li').removeClass('active');
    search_location = $('form')
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

  render: function() {
    var content = this.template({});
    this.$el.html(content);
    return this;
  },

  toggleLinkHighlight: function($link) {
    if ($link.hasClass('active')) {
      $link.removeClass('active');
    } else {
      $link.addClass('active');
    }
  }
});
