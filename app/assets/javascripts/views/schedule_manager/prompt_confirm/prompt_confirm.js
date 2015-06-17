FosterPals.Views.ConfirmStay = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.stay = options.stay;
    this.animal = options.animal;
    this.org = options.org;

    this.listenTo(this.stay, 'sync', this.render);
    this.listenTo(this.animal, 'sync', this.render);
    this.listenTo(this.org, 'sync', this.render);
  },

  template: JST['schedule_manager/prompt_confirm/prompt_confirm'],

  className: 'confirm-stay-view well',

  events: {
  },

  render: function () {
    var content = this.template({
      stay: this.stay,
      animal: this.animal,
      org: this.org
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
