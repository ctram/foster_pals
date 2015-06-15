FosterPals.Views.Navbar = Backbone.CompositeView.extend({
  template: JST['navbar/navbar'],

  className: 'container',

  events: {
    'click a#sign-out-link': 'signOut',
    // FIXME: right now, if you copy and paste a url into the address bar, li hightlighting defaults the  "home" regardless of what page you are actually on - fix that.
    'click nav a': 'followLink',
    'click button#search-btn': 'submitSearch'
  },

  initialize: function (options) {
    this.router = options.router;
    this.listenTo(this.router, '', this.render);
  },

  followLink: function (event) {
    var $destLink = $(event.currentTarget);
    var $destLi = $(event.currentTarget.parentElement);
    this.switchHighlights($destLi);
    var dest = $destLink.attr('id');
    Backbone.history.navigate(dest, {trigger: true});
  },

  submitSearch: function (event) {
    event.preventDefault();
    $locationInput = $('#search-input');
    var locationQuery = $locationInput.val();
    $.ajax('/api/users', {
      dataType:'json',
      data: {location_query: locationQuery},
      success: function (response) {
        // NOTE: receive back a response which is an array of JSON objects -> users
        var users = new FosterPals.Collections.Users(response.users);
        // FIXME: troubleshoot search - search is reaching search action again in the router.

        FosterPals.SearchResults = users.models;
        Backbone.history.navigate('#search', {trigger: true});
      }
    });
  },

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
