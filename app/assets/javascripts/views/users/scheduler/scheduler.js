FosterPals.Views.UserScheduler = Backbone.CompositeView.extend({
  template: JST['users/scheduler/scheduler'],

  className: 'scheduler',

  initialize: function (options) {
    this.user = options.model;

    this.profileView = new FosterPals.Views.Profile({
      model: this.user,
      viewingFromScheduler: true
    });
    this.addSubview('.row', this.profileView);

    this.datesPickerView = new FosterPals.Views.DatesPicker({});
    this.addSubview('.row', this.datesPickerView);

    this.listenTo(this.user, 'sync', this.render);
  },

  events: {
    'click button#back-to-profile-btn': 'goToShow'
  },

  goToShow: function (event) {
    var id = this.user.escape('id');
    var url = 'users/' + id;
    Backbone.history.navigate(url, {trigger: true});
  },

  render: function () {
    var content = this.template({
      model: this.user
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
