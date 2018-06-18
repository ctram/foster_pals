FosterPals.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.currentUser = options.currentUser;
    this.users = options.users;
  },

  routes: {
    '': 'search',
    search: 'search',
    'users/:id': 'userShow',
    'users/:id/scheduler': 'userScheduler',
    'animal-roster': 'animalRoster',
    'schedule-manager': 'scheduleManager',
    profile: 'profile',
    'animals/:id': 'animalShow',
    'sign-out': 'signOut'
  },

  animalRoster: function() {
    var currentUserCallback = function(currentUser) {
      var animals = currentUser.animals_as_org();
      var animalRosterView = new FosterPals.Views.AnimalRoster({
        model: this.currentUser,
        collection: animals
      });
      this._swapView(animalRosterView);
    }.bind(this);

    this.currentUser.fetch({
      success: currentUserCallback
    });
  },

  animalShow: function(id) {
    var animal = new FosterPals.Models.Animal({
      id: id
    });

    // TODO: the currentUser has info of all animals from the get go because user would have landed on the animal_roster page first and at that point all animal data is fetched - so those animals should be added into an collection - then when animalShow() is called, the animal in question can be accessed from the collection instead of requiring a fetch.
    animal.fetch({
      success: function() {
        var animalShowView = new FosterPals.Views.AnimalShow({
          model: animal
        });
        this._swapView(animalShowView);
      }.bind(this)
    });
  },

  profile: function() {
    this.userShow(CURRENT_USER_ID);
  },

  scheduleManager: function() {
    this.currentUser.fetch({
      success: function() {
        var scheduleManagerView = new FosterPals.Views.ScheduleManager({
          model: this.currentUser
        });
        this._swapView(scheduleManagerView);
      }.bind(this)
    });
  },

  search: function(search_location) {
    var users = new FosterPals.Collections.Users();
    users.fetch();
    FosterPals.views.searchResults = new FosterPals.Views.SearchResults({
      collection: users,
      search_location: search_location
    });
    Backbone.history.navigate('search');
    this._swapView(FosterPals.views.searchResults);
  },

  userScheduler: function(id) {
    if (id === null) {
      id = parseInt(this.currentUser.escape('id'));
    }
    var user = this.users.getOrFetch(id);

    var currentUserCallback = function() {
      var animals = this.currentUser.animals_as_org();

      var userSchedulerView = new FosterPals.Views.UserScheduler({
        model: user,
        currentUser: this.currentUser,
        animals: animals
      });
      this._swapView(userSchedulerView);
    }.bind(this);

    this.currentUser.fetch({
      success: currentUserCallback
    });
  },

  userShow: function(id) {
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

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

  signOut: function() {
    $.ajax({
      url: '/session',
      type: 'DELETE',
      success: function() {
        window.location = '/session/new';
      }
    });
  }
});
