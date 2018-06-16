FosterPals.Views.PromptConfirm = Backbone.CompositeView.extend({
  template: JST['schedule_manager/prompt_confirm/prompt_confirm'],

  className: 'confirm-stay-view',

  events: {
    'click button.confirm-stay': 'confirmStay'
  },

  initialize: function(options) {
    FosterPals.router.navigate('schedule-manager/prompt-confirm');
    this.stay = options.stay;
    this.org = options.org;
    this.overlappingStays = options.overlappingStays;
    this.user = options.user;

    this.listenTo(this.stay, 'sync', this.render);
    this.listenTo(this.org, 'sync', this.render);
  },

  confirmStay: function() {
    var _this = this;
    this.stay.set({ status: 'confirmed', denyOthers: true });

    $.ajax('/api/stays/' + this.stay.id, {
      method: 'patch',
      dataType: 'json',
      data: { stay: this.stay.attributes },
      success: function() {
        _this.render({ confirmed: true });
      }
    });
  },

  render: function(options) {
    options = options || { confirmed: false };
    var content = this.template({
      stay: this.stay,
      org: this.org,
      overlappingStays: this.overlappingStays,
      confirmed: options.confirmed
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
