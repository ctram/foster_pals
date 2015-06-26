FosterPals.Views.PromptConfirm = Backbone.CompositeView.extend({
  // TODO: DRY up confirmation and denial views -- both view are pretty much the same.
  initialize: function (options) {
    this.stay = options.stay;
    this.org = options.org;
    this.overlappingStays = options.overlappingStays;

    this.listenTo(this.stay, 'sync', this.render);
    this.listenTo(this.org, 'sync', this.render);
  },

  template: JST['schedule_manager/prompt_confirm/prompt_confirm'],

  className: 'confirm-stay-view well',

  events: {
  },

  render: function () {
    var content = this.template({
      stay: this.stay,
      org: this.org,
      overlappingStays: this.overlappingStays
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
