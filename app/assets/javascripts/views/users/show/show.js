FosterPals.Views.UserShow = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.user = options.model;
    var profileView = new FosterPals.Views.Profile({
      model: this.user
    });
    var contactIslandView = new FosterPals.Views.ContactIsland({
      model: this.user
    });
    var aboutView = new FosterPals.Views.About({
      model: this.user
    });

    this.addSubview('.profile-hook', profileView);
    this.addSubview('.about-hook', aboutView);
    this.listenTo(this.user, 'sync', this.render);
  },

  template: JST['users/show/show'],

  className: 'show',

  // events: {
  //   'click button.schedule-btn': 'refreshShow'
  // },

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },



});
