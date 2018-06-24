FosterPals.Views.ScheduleManager = Backbone.CompositeView.extend({
  template: JST['schedule_manager/schedule_manager'],

  className: 'schedule-manager-view',

  events: {
    'click button.rtrn-to-manager': 'backToScheduleManager',
    'click button.prompt-confirm': 'promptConfirm',
    'click button.prompt-deny': 'promptDeny'
  },

  initialize: function() {
    var _this = this;
    _this.setupSubviews().then(function() {
      _this.render();
    });
  },

  /**
   * @method setupSubviews attach all subviews related to stay requests.
   * @return {Promise}
   */
  setupSubviews: function() {
    var _this = this;
    _this.stays_as_fosterer = _this.model.stays_as_fosterer();
    _this.numConfirmedStays = 0;
    _this.numPendingStays = 0;
    _this.numDeniedStays = 0;

    var promises = _this.stays_as_fosterer.map(function(stay) {
      return FosterPals.Collections.users.getOrFetch(stay.get('org_id')).then(function(org) {
        return { stay: stay, org: org };
      });
    });

    return Promise.all(promises).then(function(results) {
      results.forEach(function(result) {
        var stay = result.stay;
        var org = result.org;

        var scheduleManagerItemView = new FosterPals.Views.ScheduleManagerItem({
          org: org,
          stay: stay
        });

        // TODO: move some of code into separate functions, too much going on in the intialize.
        if (stay.get('status') === 'confirmed') {
          _this.numConfirmedStays++;
          _this.addSubview('.scheduled-animals', scheduleManagerItemView);
        } else if (stay.get('status') === 'pending') {
          _this.numPendingStays++;
          _this.addSubview('.pending-animals', scheduleManagerItemView);
        } else {
          _this.numDeniedStays++;
          _this.addSubview('.denied-animals', scheduleManagerItemView);
        }
      });
    });
  },

  backToScheduleManager: function() {
    FosterPals.router.navigate('schedule-manager', { trigger: true });
  },

  promptConfirm: function(event) {
    var _this = this;
    var $btn = $(event.currentTarget);
    var stayId = $btn.data('stay-id');
    var stay = _this.stays_as_fosterer.get(stayId);
    var orgId = stay.get('org_id');

    FosterPals.Collections.users.getOrFetch(orgId).then(function(org) {
      $.ajax('/api/users/check-overlapping-stays', {
        method: 'get',
        dataType: 'json',
        success: function(overlappingStays) {
          overlappingStays = new FosterPals.Collections.Stays(overlappingStays);
          var promptConfirmView = new FosterPals.Views.PromptConfirm({
            stay: stay,
            org: org,
            overlappingStays: overlappingStays,
            user: _this.model
          });

          $('.animal-stays').toggleClass('d-none');
          _this.addSubview('.confirmation', promptConfirmView);
        },
        data: { stay_id: stayId }
      });
    });
  },

  promptDeny: function(event) {
    var _this = this;
    var $btn = $(event.currentTarget);
    var stayId = $btn.data('stay-id');
    var stay = _this.stays_as_fosterer.get(stayId);

    var orgId = stay.get('org_id');
    var animalId = stay.get('animal_id');
    var org;

    FosterPals.Collections.users
      .getOrFetch(orgId)
      .then(function(_org) {
        org = _org;
        return FosterPals.Collections.animals.getOrFetch(animalId);
      })
      .then(function(animal) {
        var denyStayView = new FosterPals.Views.DenyStay({
          stay: stay,
          animal: animal,
          org: org,
          user: _this.model
        });
        $('.animal-stays').toggleClass('d-none');
        _this.addSubview('.confirmation', denyStayView);
      });
  },

  render: function() {
    var content = this.template({
      numConfirmedStays: this.numConfirmedStays,
      numDeniedStays: this.numDeniedStays,
      numPendingStays: this.numPendingStays
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
