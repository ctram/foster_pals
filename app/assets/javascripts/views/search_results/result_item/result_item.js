FosterPals.Views.ResultItem = Backbone.CompositeView.extend({
  template: JST['search_results/result_item/result_item'],

  className: 'user-item-view',

  events: {
  },

  initialize: function () {

  },


  render: function () {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
