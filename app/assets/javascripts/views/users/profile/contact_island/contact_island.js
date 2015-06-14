FosterPals.Views.ContactIsland = Backbone.CompositeView.extend({
  template: JST['users/profile/contact_island/contact_island'],

  initialize: function (options) {
    this.user = options.model;
    viewingFromScheduler = options.viewingFromScheduler;

    if (this.user.get('id') !== CURRENT_USER_ID) {
      var contactBtnView = new FosterPals.Views.ContactBtn({
        model: this.user
      });
      this.addSubview('.contact-btns', contactBtnView);

      if (!viewingFromScheduler) {
        var scheduleBtnView = new FosterPals.Views.SchedulerBtn({
          model: this.user
        });
        this.addSubview('.contact-btns', scheduleBtnView);
      }
    }

    this.listenTo(this.user, 'sync', this.render);
  },

  render: function () {
    var content = this.template({model: this.user});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
