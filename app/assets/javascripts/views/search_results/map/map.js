FosterPals.Views.Map = Backbone.CompositeView.extend({
  initialize: function (options) {
    this._markers = {};

    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);
    this.listenTo(FosterPals.Events, 'pan', this.pan);
    if (options.search_location) {
      this.pan(search_location);
    }
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

    // TODO: show a mini profile preview when the mouse hovers over a marker.
    google.maps.event.addListener(marker, 'mouseover', function (event) {
      view.addProfilePreview(event, user.id);
    });

    google.maps.event.addListener(marker, 'mouseout', function (event) {
      view.removeProfilePreview(event, user.id);
    });

    this._markers[user.id] = marker;
  },

  addProfilePreview: function (evt, userId) {
    FosterPals.Events.trigger('mouseOverMarker', userId);
  },

  initMap: function () {
    var mapOptions = {
      center: { lat: 37.7833, lng: -95.4167 },
      zoom: 5
    };
    this._map = new google.maps.Map(this.el, mapOptions);
    FosterPals.map = this._map;
    this.map = this._map;
    this.collection.each(this.addMarker.bind(this));
    google.maps.event.trigger(window, 'load');
    google.maps.event.addDomListener(this._map, 'idle', this.reDrawMap.bind(this));
  },

  pan: function (search_location) {
    // TODO: when map re-renders, it should set an appropriate zoom   to cover the current "subject", right now it retains the current zoom level.
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
          var coords = {lat: lat, lng: long};
          this._map.panTo(coords);
        }
      }.bind(this)
    });
  },

  reDrawMap: function () {
    // TODO: have the current user's marker look unique.
    bounds = this._map.getBounds();
    NECoords = bounds.getNorthEast();
    SWCoords = bounds.getSouthWest();

    upperLong = NECoords.F;
    lowerLong = SWCoords.F;

    upperLat = NECoords.A;
    lowerLat = SWCoords.A;

    viewport_bounds = {lat: [lowerLat, upperLat], long: [lowerLong, upperLong]};

    this.collection.fetch({
      data: { viewport_bounds: viewport_bounds }
    });
  },

  removeMarker: function (user) {
    var marker = this._markers[user.id];
    marker.setMap(null);
    delete this._markers[user.id];
  },

  removeProfilePreview: function (evt, userId) {
    FosterPals.Events.trigger('mouseOutMarker', userId);
  },

  render: function () {
    var content = this.template();
    // var content = this.template();
    // this.$el.html(content);
    this.attachSubviews();
    return this;
  },


  showMarkerInfo: function (event, marker) {
    // TODO: have a div of information show up when the marker is clicked on, perhaps a mini profile of the user clicked on.
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
