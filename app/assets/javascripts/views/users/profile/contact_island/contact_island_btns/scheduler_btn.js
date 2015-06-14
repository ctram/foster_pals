FosterPals.Views.SchedulerBtn = Backbone.CompositeView.extend({
  template: JST['users/profile/contact_island/contact_island_btns/scheduler_btn'],

  initialize: function (options) {

    this.user = options.model;
    this.listenTo(this.user, 'sync', this.render);
  },

  events: {
    'click button#schedule-btn': 'goToScheduler'
  },

  goToScheduler: function (event) {
    var id = this.user.escape('id');
    var url = '#users/' + id + '/scheduler';

    Backbone.history.navigate(
      url,
      {trigger: true}
    );
  },

  render: function () {
    var content = this.template({user: this.user});
    this.$el.html(content);
    return this;
  }

});
