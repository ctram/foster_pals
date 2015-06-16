FosterPals.Views.UserScheduler = Backbone.CompositeView.extend({
  template: JST['users/scheduler/scheduler'],

  className: 'scheduler',

  initialize: function (options) {
    this.currentUser = options.currentUser;

    this.profileView = new FosterPals.Views.Profile({
      model: this.model,
      viewingFromScheduler: true
    });
    this.addSubview('.row', this.profileView);

    this.datesPickerView = new FosterPals.Views.DatesPicker({
      currentUser: this.currentUser,
      model: this.model
    });
    this.addSubview('.row', this.datesPickerView);

    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click button#back-to-profile-btn': 'goToShow'
  },

  goToShow: function (event) {
    var id = this.model.escape('id');
    var url = 'users/' + id;
    Backbone.history.navigate(url, {trigger: true});
  },

  render: function () {
    var content = this.template({
      model: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
