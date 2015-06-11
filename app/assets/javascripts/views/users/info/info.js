FosterPals.Views.Info = Backbone.CompositeView.extend({
  template: JST['users/info/info'],

  initialize: function (options) {
    this.user = options.user;
    this.aboutDisplayView = new FosterPals.Views.AboutDisplay({
      model: this.user
    });
    this.addSubview('.about-info-text', this.aboutDisplayView);
    this.listenTo(this.user, 'sync', this.render);
  },

  events: {
    'click button.about-update-button': 'addAboutForm',
    'click button.about-info-save-btn': 'saveAboutData'
  },

  render: function () {
    var content = this.template({user: this.user});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

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
  },

  saveAboutData: function () {
    // FIXME: so far it's possible update the about_info to send the data through the query string -- but what if you don't want show the information in the query string?

    // TODO: NEXT, on the train, working on getting a schedule button up and the schedule page.

    var $form = $('form.about-info-form');
    var aboutInfoData = $form.serializeJSON();
    $.ajax('/api/update_about_info', {
      method: 'POST',
      headers: {
        test: 'asdasd'
      },
      data: aboutInfoData
    });
  }



});
