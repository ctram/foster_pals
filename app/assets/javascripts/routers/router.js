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
    'users/:id/schedule': 'userSchedule'
  },

  userSchedule: function (id) {
    var user = this.users.getOrFetch(id);
    var userScheduleView = new FosterPals.Views.UserSchedule({
      model: this.user
    });
    userScheduleView.attachSubviews();
    this._swapView(userScheduleView);
  },

  userShow: function (id) {

    var user = this.users.getOrFetch(id);
    var userShowView = new FosterPals.Views.UserShow({ user: user
    });

    userShowView.attachSubviews();
    this._swapView(userShowView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});

// # TODO: think about how to get to backbone app and what to call the root page.
