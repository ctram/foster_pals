FosterPals.Views.DatesPicker = Backbone.CompositeView.extend({
  template: JST['users/scheduler/confirmation/confirmation'],

  className: 'confirmation-view well col-md-8',

  events: {
  },

  initialize: function (options) {
  },

  render: function () {
    var content = this.template({
      user: this.model,
      currentUser: this.currentUser,
      stays: this.collection
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;

  }

});
