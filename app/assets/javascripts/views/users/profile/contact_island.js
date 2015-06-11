FosterPals.Views.ContactIsland = Backbone.CompositeView.extend({
  template: JST['users/profile/contact_island'],

  initialize: function (options) {
    this.user = options.user;

    var contactBtnView = new FosterPals.Views.ContactBtn({
      user: this.user
    });
    this.addSubview('.contact-btn', contactBtnView);

    var scheduleBtnView = new FosterPals.Views.ScheduleBtn({
      user: this.user
    });
    this.addSubview('.schedule-btn', scheduleBtnView);

    this.listenTo(this.user, 'sync', this.render);
  },

  render: function () {
    var content = this.template({user: this.user});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
