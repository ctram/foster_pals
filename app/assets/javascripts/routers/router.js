FosterPals.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.fosterers = options.fosterers;
    this.orgs = options.orgs;
  },

  events: {
    '' : 'show'
  },

  show: function () {

    var showView = new FosterPals.Views.Show({

    });
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});

// # TODO: think about how to get to backbone app and what to call the root page.
