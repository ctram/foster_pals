FosterPals.Views.Island = Backbone.CompositeView.extend({
  template: JST['users/profile/island'],

  initialize: function () {

  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
