FosterPals.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST['search_results/search_results'],

  id: 'search-results-view',

  events: {
    'click div.result-item': 'toUserShowPage'
  },

  initialize: function () {
    var mapView = new FosterPals.Views.Map();
    this.addSubview('#map', mapView);

    var users = this.collection;

    // HACK: to prevent an empty list item appearing on the list of search results.
    if (users.length !== 1) {
      for (var i = 0; i < users.models.length; i++) {
        model = users.models[i];
        this.addResultItem(model);
      }
    }

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
  },

  toUserShowPage: function (event) {
    var $div = $(event.currentTarget);
    var userId = $div.data('user-id');
    var destUrl = '/#users/' + userId;
    // HACK: to pass the user id to the router userShow action. Otherwise, Backbone.history.navigate is not passing the id for some reason.
    FosterPals.UserId = parseInt(userId);
    Backbone.history.navigate(destUrl, {trigger: true});
  }
});
