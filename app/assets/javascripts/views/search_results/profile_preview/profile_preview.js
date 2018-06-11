FosterPals.Views.ProfilePreview = Backbone.CompositeView.extend({
  initialize : function (options) {
    this.model = options.model;
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['search_results/profile_preview/profile_preview'],

  events: {
  },

  className: 'profile-preview-view card p-3',

  render: function () {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
