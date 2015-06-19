FosterPals.Views.About = Backbone.CompositeView.extend({
  template: JST['users/about/about'],

  className: 'about-view col-md-8 well',

  initialize: function (options) {
    this.user = options.model;
    this.aboutTextView = new FosterPals.Views.AboutText({
      model: this.user
    });
    this.addSubview('section', this.aboutTextView);
    this.listenTo(this.user, 'sync change', this.render);
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

  addAboutForm: function (event) {
    if (parseInt(this.user.id) !== CURRENT_USER_ID) {
      alert('you do not own this content');
      return;
    }

    this.aboutTextView.remove();
    this.aboutFormView = new FosterPals.Views.AboutForm({
      model: this.user
    });

    this.addSubview('section', this.aboutFormView);
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
        //
      }.bind(this)
    });
  }
});
