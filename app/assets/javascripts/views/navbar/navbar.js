FosterPals.Views.Navbar = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.router = options.router;
    this.listenTo(this.router, '', this.render);
  },

  template: JST['navbar/navbar'],

  className: 'navbar-view',

  events: {
    'click a#sign-out-link': 'signOut',
    // FIXME: right now, if you copy and paste a url into the address bar, li hightlighting defaults the  "home" regardless of what page you are actually on - fix that.
    'click nav a': 'followLink',
    'click button#search-btn': 'panToLocation',
    'submit form': 'panToLocation'
  },

  followLink: function (event) {
    var $destLink = $(event.currentTarget);
    var $destLi = $(event.currentTarget.parentElement);
    this.switchHighlights($destLi);
    var dest = $destLink.attr('id');
    Backbone.history.navigate(dest, {trigger: true});
  },

  panToLocation: function (event) {
    event.preventDefault();
    search_location = $('form').find('input').val();
    $.ajax('/api/search/location-to-geocode', {
      data: {search_location: search_location},
      method: 'get',
      dataType: 'json',
      success: function (response) {
        if ((response.status === 'ZERO_RESULTS') && ($('.no-results-err').length === 0)) {
          $errMsg = $('<div>').addClass('no-results-err').html('Location not found');
          $('.map-hook').prepend($errMsg);
          setTimeout(function () {
            $('.no-results-err').toggleClass('fade-in');
          }, 0);
          setTimeout(function () {
            $('.no-results-err').toggleClass('fade-in');
            $('.no-results-err').toggleClass('fade-out');
          }, 2000);
          setTimeout(function () {
            $('.no-results-err').remove();
          }, 6000);
        } else {
          var lat = response.results[0].geometry.location.lat;
          var long = response.results[0].geometry.location.lng;
          var coords = {lat: lat, lng: long}
          FosterPals.Events.trigger('pan', coords);
        }
      }
    });
  },

  // submitSearch: function (event) {
  //   event.preventDefault();
  //   $locationInput = $('#search-input');
  //   var locationQuery = $locationInput.val();
  //   $.ajax('/api/users', {
  //     dataType:'json',
  //     data: {location_query: locationQuery},
  //     success: function (response) {
  //       // NOTE: receive back a response which is an array of JSON objects -> users
  //       var users = new FosterPals.Collections.Users(response.users);
  //       FosterPals.SearchResults = users.models;
  //       // FIXME: when already on the search page, not able to commit a new search.
  //       Backbone.history.navigate('#search', {trigger: true});
  //     }
  //   });
  // },

  signOut: function (event) {
    $.ajax(
      {
        url: '/session',
        type: 'DELETE',
        success: function () {
          window.location = '/session/new';
        }
      }
    );
  },

  switchHighlights: function ($newLi) {
    if (this.$currentLi === undefined) {
      this.$currentLi = $('li.active');
    }

    this.toggleLinkHighlight($newLi);
    this.toggleLinkHighlight(this.$currentLi);
    this.$currentLi = $newLi;
  },

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    return this;
  },

  toggleLinkHighlight: function ($link) {
    if ($link.hasClass('active')) {
      $link.removeClass('active');
    } else {
      $link.addClass('active');
    }
  }
});
