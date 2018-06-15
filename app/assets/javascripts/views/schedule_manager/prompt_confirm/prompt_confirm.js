FosterPals.Views.PromptConfirm = Backbone.CompositeView.extend({
  template: JST['schedule_manager/prompt_confirm/prompt_confirm'],

  className: 'confirm-stay-view',

  events: {
    'click button.rtrn-to-manager': 'returnToManager',
    'click button.confirm-stay': 'confirmStay'
  },

  initialize: function(options) {
    this.stay = options.stay;
    this.org = options.org;
    this.overlappingStays = options.overlappingStays;
    this.user = options.user;

    this.listenTo(this.stay, 'sync', this.render);
    this.listenTo(this.org, 'sync', this.render);
  },

  returnToManager: function() {
    this.user.fetch().then(function () {
      Backbone.history.navigate('schedule-manager', { trigger: true });
    })
  },

  confirmStay: function(event) {
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
