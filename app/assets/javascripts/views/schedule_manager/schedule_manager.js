FosterPals.Views.ScheduleManager = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.stays_as_fosterer = this.model.stays_as_fosterer();
    debugger

    this.stays_as_fosterer.each( function (stay) {

      var animalId = stay.get("animal_id");
      var orgId = stay.get('org_id');
      var animal = FosterPals.Collections.animals.getOrFetch(animalId);
      var org = FosterPals.Collections.users.getOrFetch(orgId);

      var scheduleManagerItemView = new FosterPals.Views.ScheduleManagerItem ({
        animal: animal,
        org: org,
        stay: stay
      });

      // TODO: move some of this code into separate functions, too much going on in the intialize.
      if (stay.get("status") === 'confirmed') {
        this.addSubview('.scheduled-animals', scheduleManagerItemView);
      } else if (stay.get("status") === 'pending') {
        this.addSubview('.pending-animals', scheduleManagerItemView);
      } else {
        this.addSubview('.denied-animals', scheduleManagerItemView);
      }
    }.bind(this));

    this.listenTo(this.stays_as_fosterer, 'sync', this.render);
  },

  template: JST['schedule_manager/schedule_manager'],

  className: 'schedule-manager-view',

  events: {
    'click button.prompt-confirm': 'promptConfirm',
    'click button.confirm-stay': 'confirmStay',
    'click button.rtrn-to-manager': 'backToScheduleManager',
    'click button.prompt-deny': 'promptDeny',
    'click button.deny-stay': 'denyStay'
  },

  backToScheduleManager: function (event) {
    $('.animal-stays').toggleClass('display-none');
    var confirmStayView = this.subviews('.confirmation')._wrapped[0];

    this.removeSubview('.confirmation', confirmStayView);
  },

  confirmStay: function (event) {
    $btn = $(event.currentTarget);
    var stayId = $btn.data('stay-id');
    var stay = this.stays_as_fosterer.get(stayId);

    var animalId = stay.get('animal_id');
    var animal = FosterPals.Collections.animals.getOrFetch(animalId);

    stay.set({status: 'confirmed'});
    // TODO: need to set an animal's fosterer_id when a reservation is made.
    animal.set({status: 'fostered', fosterer_id: CURRENT_USER_ID});

    stayAttrs = stay.attributes;
    animalAttrs = animal.attributes;

    // TODO: move ajax calls to backbone save()
    $.ajax('/api/stays/' + stayId, {
      method: 'patch',
      dataType: 'json',
      data: {stay: stayAttrs},
      success: function() {
        setTimeout(function () {
          $('.res-confirmation').addClass('fadeIn');
        }, 0);
        setTimeout(function () {
          $('.res-confirmation').addClass('fadeOut');
        }, 1000);
        setTimeout(function () {
          Backbone.history.loadUrl();
        }, 3500);
      }
    });

    $.ajax('/api/animals/' + animalId, {
      method: 'patch',
      dataType: 'json',
      data: {animal: animalAttrs}
    });


  },

  denyStay: function (event) {
    $btn = $(event.currentTarget);
    var stayId = $btn.data('stay-id');
    var stay = this.stays_as_fosterer.get(stayId);

    stay.set({status: 'denied'});

    stayAttrs = stay.attributes;

    // $.ajax('/api/stays/' + stayId, {
    //   method: 'patch',
    //   dataType: 'json',
    //   data: {stay: stayAttrs}
    // });

    $.ajax('/api/stays/' + stayId, {
      method: 'patch',
      dataType: 'json',
      data: {stay: stayAttrs},
      success: function() {
        setTimeout(function () {
          $('.res-confirmation').addClass('fadeIn');
        }, 0);
        setTimeout(function () {
          $('.res-confirmation').addClass('fadeOut');
        }, 1000);
        setTimeout(function () {
          Backbone.history.loadUrl();
        }, 3500);
      }
    });
  },

  promptConfirm: function (event) {
    $btn = $(event.currentTarget);
    var stayId = $btn.data('stay-id');
    var stay = this.stays_as_fosterer.get(stayId);

    var orgId = stay.get('org_id');
    var animalId = stay.get('animal_id');

    var org = FosterPals.Collections.users.getOrFetch(orgId);
    var animal = FosterPals.Collections.animals.getOrFetch(animalId);


    function successCallback (response) {
      var overlappingStays = new FosterPals.Collections.Stays(overlappingStays);
    // TODO: pull in overlapping stays

    }

    $.ajax('/api/users/check-overlapping-stays', {
      method: 'get',
      dataType: 'json',
      success: successCallback,
      data: {stay_id: stayId }
    });

    var confirmStayView = new FosterPals.Views.ConfirmStay({
      stay: stay,
      animal: animal,
      org: org
    });

    $('.animal-stays').toggleClass('display-none');
    this.addSubview('.confirmation', confirmStayView);
  },

  promptDeny: function (event) {
    $btn = $(event.currentTarget);
    var stayId = $btn.data('stay-id');
    var stay = this.stays_as_fosterer.get(stayId);

    var orgId = stay.get('org_id');
    var animalId = stay.get('animal_id');

    var org = FosterPals.Collections.users.getOrFetch(orgId);
    var animal = FosterPals.Collections.animals.getOrFetch(animalId);

    var denyStayView = new FosterPals.Views.DenyStay({
      stay: stay,
      animal: animal,
      org: org
    });

    $('.animal-stays').toggleClass('display-none');
    this.addSubview('.confirmation', denyStayView);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
