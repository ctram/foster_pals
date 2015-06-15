FosterPals.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.currentUser = options.currentUser;
    this.currentUserId = options.currentUserId;
    this.users = options.users;
    //TODO: restructure router to have '' go to 'show' -- depending on whether an ID was passed, route to the current user's page. The initialization of the router should not call a route method.

    this.userShow(this.currentUserId);
  },

  routes: {
    '': 'userShow',
    'users/:id': 'userShow',
    'users/:id/scheduler': 'userScheduler',
    'animal-roster': 'animalRoster',
    'search': 'search'
  },

  animalRoster: function (id) {
    var animals_as_org = this.currentUser.animals_as_org();
    animals_as_org.fetch();

    var animalRosterView = new FosterPals.Views.AnimalRoster({
      model: this.currentUser,
      collection: animals_as_org
    });

    this._swapView(animalRosterView);
  },

  search: function (event) {
    var users = new FosterPals.Collections.Users();
    users.fetch();
    var view = new FosterPals.Views.SearchResults({
    collection: users
    });
    this._swapView(view);
  },

  // TODO: setup scheduler
  userScheduler: function (id) {
    if (id === null) {
      id = parseInt(this.currentUser.escape('id'));
    }

    var user = this.users.getOrFetch(id);

    var userSchedulerView = new FosterPals.Views.UserScheduler({
      model: user,
      currentUser: this.currentUser
    });
    // userSchedulerView.attachSubviews();
    this._swapView(userSchedulerView);
  },

  userShow: function (id) {

    if (FosterPals.UserId !== null) {
      id = FosterPals.UserId;
      FosterPals.UserId = null;
    }


    if (id === null) {
      id = parseInt(this.currentUser.escape('id'));
    }

    var user = this.users.getOrFetch(id);
    var userShowView = new FosterPals.Views.UserShow({ model: user });

    this._swapView(userShowView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;

    this.$rootEl.html(view.render().$el);
  }
});
