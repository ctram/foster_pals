FosterPals.Views.Info = Backbone.CompositeView.extend({
  template: JST['users/info/info'],

  initialize: function (options) {
    this.user = options.user;
    this.listenTo(this.user, 'sync', this.render);
  },

  events: {
    'click button.about-update-button': 'updateInfo'
  },

  render: function () {
    var content = this.template({user: this.user});
    this.$el.html(content);
    return this;
  },

  updateInfo: function (event) {
    if (parseInt(this.user.id) !== CURRENT_USER_ID) {
      alert('you do not own this content');
      return;
    }
    $updateBtn = $('about-update-button');
    $updateBtn.addClass('display-none');
// TODO: code updateInfo ajax call.
// AJAX here to post updated info data.
  }
});
