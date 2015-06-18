FosterPals.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.currentUser = options.currentUser;
    this.currentUserId = options.currentUserId;
    this.users = options.users;
  },

  routes: {
    '': 'search',
    'users/:id': 'userShow',
    'users/:id/scheduler': 'userScheduler',
    'animal-roster': 'animalRoster',
    'schedule-manager': 'scheduleManager',
    'search': 'search'
  },

  animalRoster: function (id) {
    this.currentUser.fetch();
    var animals_as_org = this.currentUser.animals_as_org();

    var animalRosterView = new FosterPals.Views.AnimalRoster({
      model: this.currentUser,
      collection: animals_as_org
    });

    this._swapView(animalRosterView);
  },

  scheduleManager: function (event) {
    this.currentUser.fetch({
      success: function () {
        var scheduleManagerView = new FosterPals.Views.ScheduleManager({
          model: this.currentUser
        });
        this._swapView(scheduleManagerView);

      }.bind(this)
    });
  },

  search: function (event) {
    /*
      - Land the user on the search page when he signs in.
      - function checks for the bounds of the map viewport.
      passes the bounds to the users#index and returns only the users's whose location is within the bounds.
      - have a listener on the view for when the map is moved: listen for the "bounds_changed" event. - when the bounds change, ping Rails and regenerate the markers (or just the list of users on the left side.)
      - using the search engine repositions the map, which in turn changes the bounds of the map, which pings Rails for the users within the bounds and then repopulates the list of users.
      







    */





    debugger
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
