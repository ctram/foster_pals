FosterPals.Views.Map = Backbone.CompositeView.extend({
  template: JST['search_results/map/map'],

  id: 'map-view',

  events: {
  },

  initialize: function () {

  },

  render: function () {
    //  TODO: insert into the template a script to populate map with markers of where fosterers and orgs are.
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
