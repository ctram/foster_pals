FosterPals.Views.ContactIsland = Backbone.CompositeView.extend({
  template: JST['users/profile/contact_island/contact_island'],

  initialize: function (options) {
    viewingFromScheduler = options.viewingFromScheduler;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
