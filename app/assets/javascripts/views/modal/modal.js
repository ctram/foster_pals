FosterPals.Views.Modal = Backbone.CompositeView.extend({
  initialize: function () {
  },

  template: JST['modal/modal'],

  className: 'modal-view',

  events: {
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
