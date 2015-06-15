FosterPals.Views.Profile = Backbone.CompositeView.extend({
  template: JST['users/profile/profile'],

  className: 'profile-view col-md-4 well',

  initialize: function (options) {
    viewingFromScheduler = options.viewingFromScheduler;

    this.contactIslandView = new FosterPals.Views.ContactIsland({
      model: this.model,
      viewingFromScheduler: viewingFromScheduler
    });
    this.addSubview('.contact-btns', this.contactIslandView);

    // // TODO: codoe ProfilePhoto view and template
    var profilePhotoView = new FosterPals.Views.ProfilePhoto({
      model: this.model
    });
    this.addSubview('.profile-photo', profilePhotoView);

    this.listenTo(this.model, 'sync', this.render);

  },

  render: function () {
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
