FosterPals.Views.DenyStay = Backbone.CompositeView.extend({
  template: JST['schedule_manager/prompt_deny/prompt_deny'],

  className: 'deny-stay-view',

  events: {
    'click button.deny-stay': 'denyStay'
  },

  initialize: function(options) {
    FosterPals.router.navigate('schedule-manager/prompt-deny');
    this.stay = options.stay;
    this.animal = options.animal;
    this.org = options.org;
  },

  denyStay: function() {
    var stay = this.stay;
    var _this = this;
    stay.set({ status: 'denied' });

    $.ajax('/api/stays/' + stay.id, {
      method: 'patch',
      dataType: 'json',
      data: { stay: stay.attributes },
      success: function() {
        _this.render({ denied: true });
      }
    });
  },

  render: function(options) {
    options = options || { denied: false };
    var content = this.template({
      stay: this.stay,
      animal: this.animal,
      org: this.org,
      denied: options.denied
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
