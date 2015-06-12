FosterPals.Views.Profile = Backbone.CompositeView.extend({
  template: JST['users/profile/profile'],

  className: 'profile col-md-4 well',

  initialize: function (options) {

    this.user = options.model;
    viewingFromScheduler = options.viewingFromScheduler;

    this.contactIslandView = new FosterPals.Views.ContactIsland({
      model: this.user,
      viewingFromScheduler: viewingFromScheduler
    });
    this.addSubview('.contact-btns', this.contactIslandView);

    this.listenTo(this.user, 'sync', this.render);

  },

  render: function () {
    var content = this.template({user: this.user});
    this.$el.html(content);
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
