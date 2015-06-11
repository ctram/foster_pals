FosterPals.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.currentUser = options.currentUser;
    this.currentUserId = options.currentUserId;
    this.users = options.users;
    this.userShow(this.currentUserId);
  },

  routes: {
    'users/:id': 'userShow',
    'users/:id/scheduler': 'userScheduler'
  },

  userScheduler: function (id) {

    var user = this.users.getOrFetch(id);
    var userSchedulerView = new FosterPals.Views.UserScheduler({
      model: user
    });
    // userSchedulerView.attachSubviews();
    this._swapView(userSchedulerView);
  },

  userShow: function (id) {

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

// # TODO: think about how to get to backbone app and what to call the root page.
