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
    'search': 'search',
    'profile': 'profile',
    'animals/:id': 'animalShow'
  },

  animalRoster: function () {
    this.currentUser.fetch({
      success: function () {
        var animals_as_org = this.currentUser.animals_as_org();

        var animalRosterView = new FosterPals.Views.AnimalRoster({
          model: this.currentUser,
          collection: animals_as_org
        });

        this._swapView(animalRosterView);
      }.bind(this)
    });
  },

  animalShow: function (id) {
    // TODO: add animal show view page -- include an image gallery
    var animal = FosterPals.Collections.animals.getOrFetch(id);
    var animalShowView = new FosterPals.Views.AnimalShow({
      model: animal
    });
    this._swapView(animalShowView);
  },

  profile: function () {
    this.userShow(CURRENT_USER_ID);
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

  search: function (search_location) {
    var users = new FosterPals.Collections.Users();
    users.fetch();
    var view = new FosterPals.Views.SearchResults({
      collection: users,
      search_location: search_location
    });
    this._swapView(view);
  },

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
