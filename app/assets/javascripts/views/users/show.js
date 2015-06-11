FosterPals.Views.UserShow = Backbone.CompositeView.extend({


  initialize: function () {
    var islandView = new FosterPals.Views.Island({
      user: this.user
    });
    this.addSubview('div', islandView);

  },

  template: JST['users/show'],

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },



});
