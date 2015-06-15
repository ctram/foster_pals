FosterPals.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST['search_results/search_results'],

  id: 'search-results-view',

  events: {
  },

  initialize: function () {
    var mapView = new FosterPals.Views.Map();
    this.addSubview('#map', mapView);

    var users = this.collection;

    for (var i = 0; i < users.models.length; i++) {
      model = users.models[i];
      this.addResultItem(model);
    }

    this.listenTo(this.collection, 'add', this.addResultItem);
  },

  addResultItem: function (model) {

    var resultItemView = new FosterPals.Views.ResultItem({
      model: model
    });
    this.addSubview('#result-items', resultItemView);
  },

  render: function () {
    //  TODO: insert into the template a script to populate map with markers of where fosterers and orgs are.
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
