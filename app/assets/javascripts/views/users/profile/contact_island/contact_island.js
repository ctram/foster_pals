FosterPals.Views.ContactIsland = Backbone.CompositeView.extend({
  template: JST['users/profile/contact_island/contact_island'],

  initialize: function (options) {

    viewingFromScheduler = options.viewingFromScheduler;

    // if (this.model.get('id') !== CURRENT_USER_ID) {
    //   var contactBtnView = new FosterPals.Views.ContactBtn({
    //     model: this.model
    //   });
    //   this.addSubview('.contact-btns', contactBtnView);
    //
    //   if (!viewingFromScheduler) {
    //     var scheduleBtnView = new FosterPals.Views.SchedulerBtn({
    //       model: this.model
    //     });
    //     this.addSubview('.contact-btns', scheduleBtnView);
    //   }
    // }

    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
