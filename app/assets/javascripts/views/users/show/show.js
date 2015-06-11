FosterPals.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show/show'],

  initialize: function (options) {
    this.user = options.model;
    var islandView = new FosterPals.Views.Island({
      model: this.user
    });
    var contactIslandView = new FosterPals.Views.ContactIsland({
      model: this.user
    });
    var infoView = new FosterPals.Views.Info({
      model: this.user
    });

    this.addSubview('.profile-island', islandView);
    this.addSubview('.profile-island', contactIslandView);
    this.addSubview('.info', infoView);
    this.listenTo(this.user, 'sync', this.render);
  },

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },



});
