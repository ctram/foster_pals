FosterPals.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST['search_results/search_results'],

  id: 'search-results-view',

  events: {
    'mouseenter div.user-item': 'startBounceAndHightlight',
    'mouseleave div.user-item': 'stopBounceAndHighlight',
    'click div.go-to-user-profile': 'toUserShow',
    'click div.user-item': 'panToListing',
    'click .explain': 'moveTourForward'
  },

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

  highlightUserItem: function(event) {
    var $resultItem = $(event.currentTarget);
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

  removeAllProfilePreviews: function() {
    var _this = this;
    this.profilePreviews.forEach(function(profilePreview) {
      _this.removeSubview('.profile-preview-hook', profilePreview);
    });
  },

  showProfilePreview: function(userId) {
    var _this = this;
    FosterPals.Collections.users.getOrFetch(userId).then(function(user) {
      var profilePreviewView = new FosterPals.Views.ProfilePreview({
        model: user
      });
      _this.profilePreviews.push(profilePreviewView);

      _this.addSubview('.profile-preview-hook', profilePreviewView);
    });
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
    FosterPals.shutdownTour();
    var $div = $(event.currentTarget);
    var userId = $div.data('user-id');
    var destUrl = 'users/' + userId;
    // HACK: to pass the user id to the router userShow action. Otherwise, Backbone.history.navigate is not passing the id for some reason.
    FosterPals.UserId = parseInt(userId);
    Backbone.history.navigate(destUrl, { trigger: true });
  },

  unhighlightUserItem: function(event) {
    var $resultItem = $(event.currentTarget);
    $resultItem.removeClass('active-user-item');
  },

  moveTourForward: function() {
    FosterPals.moveTourForward();
  },

  render: function() {
    var _this = this;
    var content = this.template({
      tourOn: FosterPals.state.tourOn,
      tourStep: FosterPals.state.tourStep
    });
    _this.$el.html(content);
    _this.$('.user-items-hook').html(_this.usersIndex.render().$el);
    _this.$('.map-hook').html(_this.mapView.$el);
    setTimeout(function() {
      FosterPals.state.mapFirstVisit && $('.modal-about-map').modal();
      FosterPals.state.mapFirstVisit = false;
      !FosterPals.state.tourOn && _this.mapView.initMap();
      $('.modal-about-map').on('hidden.bs.modal', function() {
        FosterPals.state.mapFirstVisit = false;
        FosterPals.state.tourOn = true;
        FosterPals.moveTourForward();
      });
    }, 0);
    return this;
  }
});
