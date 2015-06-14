FosterPals.Views.SearchMap = Backbone.CompositeView.extend({
  template: JST['search/search_map'],

  className: 'search-map',

  events: {
  },

  initialize: function () {

  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
