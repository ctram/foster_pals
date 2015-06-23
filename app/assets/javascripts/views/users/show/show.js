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

    this.addSubview('.row', profileView);
    this.addSubview('.row', aboutView);
    this.listenTo(this.user, 'sync', this.render);
  },

  template: JST['users/show/show'],

  className: 'show',

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },



});
