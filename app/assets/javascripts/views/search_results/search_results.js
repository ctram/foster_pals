FosterPals.Views.SearchResults = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.mapView = new FosterPals.Views.Map({
      collection: this.collection,
      search_location: options.search_location
    });

    this.usersIndex = new FosterPals.Views.UsersIndex({
      collection: this.collection
    });

    this.listenTo(FosterPals.Events, 'mouseOverMarker', this.showProfilePreview);
    this.listenTo(FosterPals.Events, 'mouseOutMarker', this.removeAllProfilePreviews);
    this.profilePreviews = [];
  },

  template: JST['search_results/search_results'],

  id: 'search-results-view',

  events: {
    'mouseenter div.user-item': 'startBounceAndHightlight',
    'mouseleave div.user-item': 'stopBounceAndHighlight',
    'click div.go-to-user-profile': 'toUserShow',
    'click div.user-item': 'panToListing'
  },

  highlightUserItem: function(event) {
    $resultItem = $(event.currentTarget);
    $resultItem.addClass('active-user-item');
  },

  panToListing: function(event) {
    var userId = $(event.currentTarget).data('user-id');
    var marker = this.mapView._markers[userId];
    this.mapView._map.panTo(marker.getPosition());
  },

  remove: function() {
    Backbone.View.prototype.remove.call(this);
    this.mapView.remove();
    this.usersIndex.remove();
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);

    this.$('.user-items-hook').html(this.usersIndex.render().$el);
    this.$('.map-hook').html(this.mapView.$el);
    setTimeout(
      function() {
        this.mapView.initMap();
      }.bind(this),
      0
    );
    return this;
  },

  removeAllProfilePreviews: function() {
    var _this = this;
    this.profilePreviews.forEach(function(profilePreview) {
      profilePreview.$el.removeClass('fadeIn').addClass('fadeOut');
      _this.removeSubview('.profile-preview-hook', profilePreview);
    });
  },

  showProfilePreview: function(userId) {
    var user = FosterPals.Collections.users.getOrFetch(userId);
    var profilePreviewView = new FosterPals.Views.ProfilePreview({
      model: user
    });
    this.profilePreviews.push(profilePreviewView);
    this.addSubview('.profile-preview-hook', profilePreviewView);
  },

  startBounceAndHightlight: function(event) {
    this.highlightUserItem(event);
    var userId = $(event.currentTarget).data('user-id');
    this.mapView.startBounce(userId);
  },

  stopBounceAndHighlight: function(event) {
    this.unhighlightUserItem(event);
    var userId = $(event.currentTarget).data('user-id');
    this.mapView.stopBounce(userId);
  },

  toUserShow: function(event) {
    // safety, make sure links in the navbar are not wearing tour classes if the user navigates to a new page before the tour is over.
    $('a').removeClass('nav-link-pop');

    var $div = $(event.currentTarget);
    var userId = $div.data('user-id');
    var destUrl = 'users/' + userId;
    // HACK: to pass the user id to the router userShow action. Otherwise, Backbone.history.navigate is not passing the id for some reason.
    FosterPals.UserId = parseInt(userId);
    Backbone.history.navigate(destUrl, { trigger: true });
  },

  unhighlightUserItem: function(event) {
    $resultItem = $(event.currentTarget);
    $resultItem.removeClass('active-user-item');
  }
});
