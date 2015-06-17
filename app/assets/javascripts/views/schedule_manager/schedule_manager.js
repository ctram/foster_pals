FosterPals.Views.ScheduleManager = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.stays_as_fosterer = this.model.stays_as_fosterer();
    this.stays_as_fosterer.each( function (stay) {

      var animalId = stay.get("animal_id");
      var orgId = stay.get('org_id');

      var animal = FosterPals.Collections.animals.getOrFetch(animalId);
      var org = FosterPals.Collections.users.getOrFetch(orgId);
      // TODO: also pass in the org (need org name) and the stay (need start and end dates)

      var scheduleManagerItemView = new FosterPals.Views.ScheduleManagerItem ({
        model: animal,
        org: org,
        stay: stay
      });

      // TODO: move some of this code into separate functions, too much going on in the intialize.
      if (stay.get("status") === 'fostered') {
        this.addSubview('.scheduled-animals', scheduleManagerItemView);
      } else if (stay.get("status") === 'pending') {
        this.addSubview('.pending-animals', scheduleManagerItemView);
      }
    }.bind(this));

    this.listenTo(this.stays_as_fosterer, 'sync', this.render);
  },

  template: JST['schedule_manager/schedule_manager'],

  className: 'schedule-manager-view',

  events: {
    'click button.confirm-stay': 'confirmStay',
    'click button.finalize-stay': 'finalizeStay'
  },

  confirmStay: function (event) {
    $btn = $(event.currentTarget);
    var stayId = $btn.data('stay-id');
    var stay = this.stays_as_fosterer.get(stayId);

    var orgId = stay.get('org_id');
    var animalId = stay.get('id');

    var org = FosterPals.Collections.users.getOrFetch(orgId);
    var animal = FosterPals.Collections.animals.getOrFetch(animalId);

    var confirmStayView = new FosterPals.Views.ConfirmStay({
      stay: stay,
      animal: animal,
      org: org
    });
    $('.animal-stays').toggleClass('display-none');
    this.addSubview('.confirmation', confirmStayView);
  },

  finalizeStay: function (event) {
    $btn = $(event.currentTarget);
    var stayId = $btn.data('stay-id');
    var stay = this.stays_as_fosterer.get(stayId);

    var animalId = stay.get('animal_id');
    var animal = FosterPals.Collections.animals.getOrFetch(animalId);

    stay.set({status: 'confirmed'});
    animal.set({status: 'fostered'});

    debugger

    $.ajax('/api/stays', {
      method: 'post',
      dataType: 'json',
    });


  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
