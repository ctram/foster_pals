FosterPals.Views.Info = Backbone.CompositeView.extend({
  template: JST['users/info/info'],

  initialize: function (options) {
    this.user = options.user;
  },

  events: {
    'click buttn.about-update-button': 'updateInfo'
  },

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    return this;
  },

  updateInfo: function () {
    // TODO: code updateInfo ajax call.
    // AJAX here to post updated info data.
  }
});
