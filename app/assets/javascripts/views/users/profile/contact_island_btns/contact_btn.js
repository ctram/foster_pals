FosterPals.Views.ContactBtn = Backbone.CompositeView.extend({
  template: JST['users/profile/island/contact_island_btns/contact_btn'],

  initialize: function (options) {
    this.user = options.model;
    this.listenTo(this.user, 'sync', this.render);
  },

  render: function () {
    var content = this.template({user: this.user});
    this.$el.html(content);
    return this;
  }

});
