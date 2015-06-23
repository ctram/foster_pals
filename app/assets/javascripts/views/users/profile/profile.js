FosterPals.Views.Profile = Backbone.CompositeView.extend({
  initialize: function (options) {
    viewingFromScheduler = options.viewingFromScheduler;

    this.contactIslandView = new FosterPals.Views.ContactIsland({
      model: this.model,
      viewingFromScheduler: viewingFromScheduler
    });
    this.addSubview('.contact-btns', this.contactIslandView);

    // // TODO: code ProfilePhoto view and template
    var profilePhotoView = new FosterPals.Views.ProfilePhoto({
      model: this.model
    });
    this.addSubview('.profile-photo', profilePhotoView);

    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['users/profile/profile'],

  className: 'profile-view well',

  events: {
    'click button.schedule-btn': 'toScheduler',
    'click button.edit-profile-btn': 'editProfile'
  },

  editProfile: function (event) {
    event.preventDefault();
    $('.modal').modal();
  },

  render: function () {
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  toScheduler: function (event) {

    var $btn = $(event.currentTarget);
    var userId = $btn.data('user-id');
    Backbone.history.navigate('users/' + userId + '/scheduler', {trigger: true});
  }
});
