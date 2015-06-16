FosterPals.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST['search_results/search_results'],

  id: 'search-results-view',

  events: {
    'click div.result-item': 'toUserShowPage',
    // 'click a.remove-listing': 'destroyListing',
    // 'click a.result-name': 'panToListing',
    'mouseenter div.user-item': 'startBounceAndHightlight',
    'mouseleave div.user-item': 'stopBounceAndHighlight'
  },

  initialize: function () {
    this.mapView = new FosterPals.Views.Map({
      collection: this.collection
    });


    this.usersIndex = new FosterPals.Views.UsersIndex({
      collection: this.collection
    });
  },

  addResultItem: function (model) {
    var resultItemView = new FosterPals.Views.ResultItem({
      model: model
    });
    this.addSubview('#result-items', resultItemView);
  },

  highlightResultItem: function (event) {
    $resultItem = $(event.currentTarget);
    $resultItem.addClass('active-result-item');
  },


  render: function () {
    //  TODO: insert into the template a script to populate map with markers of where fosterers and orgs are.
    var content = this.template();
    this.$el.html(content);
    this.$('.result-items').html(this.usersIndex.render().$el);
    this.$('.map-hook').html(this.mapView.$el);
    this.mapView.initMap();
    return this;
  },

  toUserShowPage: function (event) {
    var $div = $(event.currentTarget);
    var userId = $div.data('user-id');
    var destUrl = '/#users/' + userId;
    // HACK: to pass the user id to the router userShow action. Otherwise, Backbone.history.navigate is not passing the id for some reason.
    FosterPals.UserId = parseInt(userId);
    Backbone.history.navigate(destUrl, {trigger: true});
  },

  unhighlightResultItem: function (event) {
    $resultItem = $(event.currentTarget);
    $resultItem.removeClass('active-result-item');
  },

    // Event handlers
  startBounceAndHightlight: function (event) {
    this.highlightResultItem(event);
    var userId = $(event.currentTarget).data('user-id');
    this.mapView.startBounce(userId);
  },

  stopBounceAndHighlight: function (event) {
    this.unhighlightResultItem(event);
    var userId = $(event.currentTarget).data('user-id');
    this.mapView.stopBounce(userId);
  },

  destroyListing: function (event) {
    var userId = $(event.currentTarget).data('user-id');
    var user = this.collection.get(userId);
    user.destroy();
  },

  panToListing: function (event) {
    var userId = $(event.currentTarget).data('user-id');
    var marker = this.mapView._markers[userId];
    this.mapView._map.panTo(marker.getPosition());
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.mapView.remove();
    this.listingsIndex.remove();
  }

});
