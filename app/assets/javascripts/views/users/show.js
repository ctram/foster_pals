FosterPals.Views.UserShow = Backbone.CompositeView.extend({


  initialize: function (options) {
    this.user = options.user;
    var islandView = new FosterPals.Views.Island({
      user: this.user
    });
    var infoView = new FosterPals.Views.Info({
      user: this.user
    });

    this.addSubview('.profile-island', islandView);
    this.addSubview('.info', infoView);
    this.listenTo(this.user, 'sync', this.render);

  },

  template: JST['users/show'],

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },



});
