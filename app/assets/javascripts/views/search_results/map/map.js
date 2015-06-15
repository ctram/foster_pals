FosterPals.Views.Map = Backbone.CompositeView.extend({
  template: JST['search_results/map/map'],

  className: 'map-view',

  events: {
  },

  initialize: function () {
    this._markers = {};


    this.listenTo(this.collection, 'add', this.addMarker);
    // this.listenTo(this.collection, 'remove', this.removeMarker);
  },

  initMap: function () {
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167 },
      zoom: 12
    };

    this._map = new google.maps.Map(this.el, mapOptions);

    this.collection.each(this.addMarker.bind(this));
    this.attachMapListeners();
  },

  attachMapListeners: function () {
    google.maps.event.addListener(this._map, 'idle', this.search.bind(this));
    google.maps.event.addListener(this._map, 'click', this.createUser.bind(this));
  },

  addMarker: function (user) {
    if (this._markers[user.id]) {
      return;
    }
    var view = this;

    var marker = new google.maps.Marker({
      position: { lat: user.get('lat'), lng: user.get('long') },
      map: this._map,
      title: user.get('name')
    });

    google.maps.event.addListener(marker, 'click', function (event) {
      view.showMarkerInfo(event, marker);
    });

    this._markers[user.id] = marker;
  },

  createUser: function (event) {
    var user = new FosterPals.Models.User({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });

    user.save({}, {
      success: function () {
        this.collection.add(user);
      }.bind(this)
    });
  },

  search: function () {
    // This method will re-fetch the map's collection, using the
    // map's current bounds as constraints on latitude/longitude.

    var mapBounds = this._map.getBounds();
    var ne = mapBounds.getNorthEast();
    var sw = mapBounds.getSouthWest();

    var filterData = {
      lat: [sw.lat(), ne.lat()],
      lng: [sw.lng(), ne.lng()]
    };

    this.collection.fetch({
      data: { filter_data: filterData }
    });
  },

  removeMarker: function (user) {
    var marker = this._markers[user.id];
    marker.setMap(null);
    delete this._markers[user.id];
  },

  showMarkerInfo: function (event, marker) {
    // This event will be triggered when a marker is clicked. Right now it
    // simply opens an info window with the title of the marker. However, you
    // could get fancier if you wanted (maybe use a template for the content of
    // the window?)

    var infoWindow = new google.maps.InfoWindow({
      content: marker.title
    });

    infoWindow.open(this._map, marker);
  },

  startBounce: function (id) {
    var marker = this._markers[id];
    marker.setAnimation(google.maps.Animation.BOUNCE);
  },

  stopBounce: function (id) {
    var marker = this._markers[id];
    marker.setAnimation(null);
  }
});
