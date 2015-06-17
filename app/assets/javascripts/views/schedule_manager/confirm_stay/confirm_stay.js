FosterPals.Views.ConfirmStay = Backbone.CompositeView.extend({
  initialize: function (options) {
  },

  template: JST['schedule_manager/confirm_stay/confirm_stay'],

  className: 'confirm-stay-view',

  events: {
  },

  render: function () {
    var stay = this.model;
    var orgId = stay.get('org_id');
    var animalId = stay.get('id');

    var org = FosterPals.Collections.users.getOrFetch(orgId);
    var animal = FosterPals.Collections.animals.gegetOrFetch(animalId);

    debugger

    var content = this.template({
      animal: animal,
      org: org,
      stay: stay
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
