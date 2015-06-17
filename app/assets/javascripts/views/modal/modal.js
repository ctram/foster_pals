FosterPals.Views.Modal = Backbone.CompositeView.extend({
  initialize: function (options) {
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
