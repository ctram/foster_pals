FosterPals.Views.ScheduleManager = Backbone.CompositeView.extend({

  template: JST['schedule_manager/schedule_manager'],

  className: 'schedule-manager-view',

  events: {
    'click button.rtrn-to-manager': 'backToScheduleManager',
    'click button.prompt-confirm': 'promptConfirm',
    'click button.prompt-deny': 'promptDeny'
  },

  initialize: function() {
    this.setupSubviews();
    this.listenTo(this.stays_as_fosterer, 'sync', this.render);
    // this.listenTo(
    //   this.model,
    //   'sync',
    //   function() {
    //     this.remove();
    //     this.setupSubviews();
    //     this.render();
    //   }.bind(this)
    // );
  },

  setupSubviews: function() {
    this.stays_as_fosterer = this.model.stays_as_fosterer();
    this.numConfirmedStays = 0;
    this.numPendingStays = 0;
    this.numDeniedStays = 0;

    this.stays_as_fosterer.each(
      function(stay) {
        var orgId = stay.get('org_id');
        var org = FosterPals.Collections.users.getOrFetch(orgId);

        var scheduleManagerItemView = new FosterPals.Views.ScheduleManagerItem({
          org: org,
          stay: stay
        });

        // TODO: move some of this code into separate functions, too much going on in the intialize.
        if (stay.get('status') === 'confirmed') {
          this.numConfirmedStays++;
          this.addSubview('.scheduled-animals', scheduleManagerItemView);
        } else if (stay.get('status') === 'pending') {
          this.numPendingStays++;
          this.addSubview('.pending-animals', scheduleManagerItemView);
        } else {
          this.numDeniedStays++;
          this.addSubview('.denied-animals', scheduleManagerItemView);
        }
      }.bind(this)
    );
  },

  backToScheduleManager: function() {
    $('.animal-stays').toggleClass('d-none');
    var confirmStayView = this.subviews('.confirmation')._wrapped[0];
    this.removeSubview('.confirmation', confirmStayView);
  },

  promptConfirm: function(event) {
    var $btn = $(event.currentTarget);
    var stayId = $btn.data('stay-id');
    var stay = this.stays_as_fosterer.get(stayId);

    var orgId = stay.get('org_id');

    var org = FosterPals.Collections.users.getOrFetch(orgId);

    var successCallback = function(overlappingStays) {
      overlappingStays = new FosterPals.Collections.Stays(overlappingStays);
      var promptConfirmView = new FosterPals.Views.PromptConfirm({
        stay: stay,
        org: org,
        overlappingStays: overlappingStays,
        user: this.model
      });

      $('.animal-stays').toggleClass('d-none');
      this.addSubview('.confirmation', promptConfirmView);
    }.bind(this);

    $.ajax('/api/users/check-overlapping-stays', {
      method: 'get',
      dataType: 'json',
      success: successCallback,
      data: { stay_id: stayId }
    });
  },

  promptDeny: function(event) {
    var $btn = $(event.currentTarget);
    var stayId = $btn.data('stay-id');
    var stay = this.stays_as_fosterer.get(stayId);

    var orgId = stay.get('org_id');
    var animalId = stay.get('animal_id');

    var org = FosterPals.Collections.users.getOrFetch(orgId);
    var animal = FosterPals.Collections.animals.getOrFetch(animalId);

    var denyStayView = new FosterPals.Views.DenyStay({
      stay: stay,
      animal: animal,
      org: org,
      user: this.model
    });

    $('.animal-stays').toggleClass('d-none');
    this.addSubview('.confirmation', denyStayView);
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
