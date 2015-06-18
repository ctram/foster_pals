FosterPals.Views.SearchResults = Backbone.CompositeView.extend({

  initialize: function () {
    this.mapView = new FosterPals.Views.Map({
      collection: this.collection
    });


    this.usersIndex = new FosterPals.Views.UsersIndex({
      collection: this.collection
    });
  },

  template: JST['search_results/search_results'],

  id: 'search-results-view',

  events: {
    'click div.user-item': 'toUserShowPage',
    // 'click a.result-name': 'panToListing',
    'mouseenter div.user-item': 'startBounceAndHightlight',
    'mouseleave div.user-item': 'stopBounceAndHighlight'

  },


  highlightUserItem: function (event) {
    $resultItem = $(event.currentTarget);
    $resultItem.addClass('active-user-item');
  },

  render: function () {
    //  TODO: insert into the template a script to populate map with markers of where fosterers and orgs are.
    var content = this.template();
    this.$el.html(content);
    this.$('.user-items').html(this.usersIndex.render().$el);
    this.$('.map-hook').html(this.mapView.$el);
    this.mapView.initMap();
    return this;
  },


  unhighlightUserItem: function (event) {
    $resultItem = $(event.currentTarget);
    $resultItem.removeClass('active-user-item');
  },

    // Event handlers
  startBounceAndHightlight: function (event) {
    this.highlightUserItem(event);
    var userId = $(event.currentTarget).data('user-id');
    this.mapView.startBounce(userId);
  },

  stopBounceAndHighlight: function (event) {
    this.unhighlightUserItem(event);
    var userId = $(event.currentTarget).data('user-id');
    this.mapView.stopBounce(userId);
  },

  panToListing: function (event) {
    var userId = $(event.currentTarget).data('user-id');
    var marker = this.mapView._markers[userId];
    this.mapView._map.panTo(marker.getPosition());
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.mapView.remove();
    this.usersIndex.remove();
  },

  toUserShowPage: function (event) {
    // FIXME: redirect to user's page is not working.
    // TODO: add new relic APM


    var $div = $(event.currentTarget);
    var userId = $div.data('user-id');
    var destUrl = 'users/' + userId;
    // HACK: to pass the user id to the router userShow action. Otherwise, Backbone.history.navigate is not passing the id for some reason.
    FosterPals.UserId = parseInt(userId);
    Backbone.history.navigate(destUrl, {trigger: true});
  },
});
