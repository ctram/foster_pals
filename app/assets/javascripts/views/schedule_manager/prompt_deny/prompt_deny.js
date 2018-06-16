FosterPals.Views.DenyStay = Backbone.CompositeView.extend({
  template: JST['schedule_manager/prompt_deny/prompt_deny'],

  className: 'deny-stay-view',

  events: {
    'click button.deny-stay': 'denyStay',
    'click button.rtrn-to-manager': 'returnToManager'
  },

  initialize: function(options) {
    this.stay = options.stay;
    this.animal = options.animal;
    this.org = options.org;
    this.user = options.user;

    this.listenTo(this.stay, 'sync', this.render);
    this.listenTo(this.animal, 'sync', this.render);
    this.listenTo(this.org, 'sync', this.render);
  },

  returnToManager: function() {
    this.user.fetch().then(
      function() {
        this.remove();
        Backbone.history.navigate('schedule-manager', { trigger: true });
        FosterPals.router.scheduleManager();
        
        // FosterPals.Events.trigger('returnToScheduleManager');
      }.bind(this)
    );
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
