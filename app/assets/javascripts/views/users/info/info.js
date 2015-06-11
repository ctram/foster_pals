FosterPals.Views.Info = Backbone.CompositeView.extend({
  template: JST['users/info/info'],

  initialize: function (options) {
    this.user = options.user;
    this.aboutDisplayView = new FosterPals.Views.AboutDisplay({
      model: this.user
    });
    this.addSubview('.about-info-text', this.aboutDisplayView);
    this.listenTo(this.user, 'sync change:about_info', this.render);
  },

  events: {
    'click button.about-update-button': 'addAboutForm'
    // 'click button.about-info-save-btn': 'saveAboutData'
  },

  render: function () {
    var content = this.template({user: this.user});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },


  



  // TODO: write addAboutForm() to be toggleForm(), which adds and removes the about-info depending on whether the AboutForm is visible.
  addAboutForm: function (event) {
    if (parseInt(this.user.id) !== CURRENT_USER_ID) {
      alert('you do not own this content');
      return;
    }
    $updateBtn = $('.about-update-button');
    $updateBtn.addClass('display-none');

    this.removeSubview('.about-info-text', this.aboutDisplayView);

    var aboutFormView = new FosterPals.Views.AboutForm({
      model: this.user
    });

    this.addSubview('.about-info-text', aboutFormView);
  }

});
