FosterPals.Views.Map = Backbone.CompositeView.extend({
  template: JST['search_results/map/map'],

  id: 'map-view',

  events: {
  },

  initialize: function () {
    // FIXME: map not fully rendered on first arrival -- needs a refresh of the view.
  },

  initMap: function () {
  var mapOptions = {
    center: { lat: 37.7833, lng: -122.4167 },
    zoom: 12
  };

  this._map = new google.maps.Map(this.el, mapOptions);
},

  render: function () {
    //  TODO: insert into the template a script to populate map with markers of where fosterers and orgs are.

    var content = this.template({
      users: this.collection
    });
    this.$el.html(content);

    return this;
  }
});
