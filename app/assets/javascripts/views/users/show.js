FosterPals.Views.UserShow = Backbone.CompositeView.extend({


  initialize: function (options) {
    this.user = options.user;
    var islandView = new FosterPals.Views.Island({
      user: this.user
    });

    this.addSubview('div', islandView);
    this.listenTo(this.user, 'sync', this.render)

  },

  template: JST['users/show'],

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },



});
