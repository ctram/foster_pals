FosterPals.Views.Test = Backbone.CompositeView.extend({

  template: JST['test'],

  className: 'test wel',

  initialize: function (options) {
  },

  render: function () {
    var content = this.template({animals: this.collection});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
