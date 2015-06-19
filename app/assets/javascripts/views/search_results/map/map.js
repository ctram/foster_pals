FosterPals.Views.Map = Backbone.CompositeView.extend({
  initialize: function () {
    this._markers = {};
    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);
    this.listenTo(FosterPals.Events, 'pan', this.pan);
  },

  template: JST['search_results/map/map'],

  className: 'map-view',

  events: {
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

  initMap: function () {
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167 },
      zoom: 12
    };
    this._map = new google.maps.Map(this.el, mapOptions);
    FosterPals.map = this._map;
    this.map = this._map;
    this.collection.each(this.addMarker.bind(this));
    google.maps.event.trigger(window, 'load');
    google.maps.event.addDomListener(this._map, 'idle', this.reDrawMap.bind(this));
  },

  pan: function (coords) {
    this._map.panTo(coords);
  },

  reDrawMap: function () {
    // TODO: have the current user's marker look special.
    bounds = this._map.getBounds();
    NECoords = bounds.getNorthEast();
    SWCoords = bounds.getSouthWest();

    upperLong = NECoords.F;
    lowerLong = SWCoords.F;

    upperLat = NECoords.A;
    lowerLat = SWCoords.A;

    viewport_bounds = {lat: [lowerLat, upperLat], long: [lowerLong, upperLong]};

    // $.ajax('/api/users/filter_by_location', {
    //   method: 'get',
    //   dataType: 'json',
    //   data: {viewport_bounds: viewport_bounds}
    // });

    this.collection.fetch({
      data: { viewport_bounds: viewport_bounds }
    });

  },

  removeMarker: function (user) {
    var marker = this._markers[user.id];
    marker.setMap(null);
    delete this._markers[user.id];
  },

  // search: function () {
  //   // This method will re-fetch the map's collection, using the
  //   // map's current bounds as constraints on latitude/longitude.
  //
  //   var mapBounds = this._map.getBounds();
  //   var ne = mapBounds.getNorthEast();
  //   var sw = mapBounds.getSouthWest();
  //
  //   var filterData = {
  //     lat: [sw.lat(), ne.lat()],
  //     lng: [sw.lng(), ne.lng()]
  //   };
  //
  //   this.collection.fetch({
  //     data: { filter_data: filterData }
  //   });
  // },

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
