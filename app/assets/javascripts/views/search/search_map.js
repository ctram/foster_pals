FosterPals.Views.SearchMap = Backbone.CompositeView.extend({
  template: JST['search/search_map'],

  className: 'search-map',

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
