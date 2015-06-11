FosterPals.Views.Info = Backbone.CompositeView.extend({
  template: JST['users/info/info'],

  initialize: function (options) {
    this.user = options.model;
    this.aboutTextView = new FosterPals.Views.AboutText({
      model: this.user
    });
    this.addSubview('section', this.aboutTextView);
    // this.listenTo(this.user, 'sync change', this.render);
  },

  events: {
    'click button.about-update-button': 'addAboutForm',
    "click button.about-info-save-btn": "updateAboutInfo"

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
    this.toggleAboutInfo();
    this.toggleUpdateBtn();

    this.aboutTextView.remove();
    this.aboutFormView = new FosterPals.Views.AboutForm({
      model: this.user
    });

    this.addSubview('section', this.aboutFormView);
  },

  removeAboutForm: function (event) {
    if (!this.aboutFormView) {
      return;
    }
    this.removeSubview('section', this.aboutFormView);
    this.toggleAboutInfo();
    this.toggleUpdateBtn();
  },


  toggleAboutInfo: function (event) {
    $('.about-info-text').toggleClass('display-none');
    // if ($aboutInfoText.hasClass('display-none')) {
    //   $aboutInfoText.removeClass('display-none');
    // } else {
    //   $aboutInfoText.addClass('display-none');
    // }
  },

  toggleUpdateBtn: function () {
    $('.about-update-button').toggleClass('display-none');
    // if ($aboutUpdateBtn.hasClass('display-none')) {
    //   $aboutUpdateBtn.removeClass('display-none');
    // } else {
    //   $aboutUpdateBtn.addClass('display-none');
    // }
  },

  updateAboutInfo: function(event){
    event.preventDefault();

    var $form = $(event.currentTarget.parentElement);
    var aboutInfoData = $form.serializeJSON();
    this.user.set(aboutInfoData);
    this.user.save({}, {
      success: function () {
        this.addSubview('section', this.aboutTextView);
        this.removeSubview('section', this.aboutFormView);
        // debugger
      }.bind(this)
    });
  }


});
