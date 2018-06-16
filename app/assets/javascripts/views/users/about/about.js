FosterPals.Views.About = Backbone.CompositeView.extend({
  template: JST['users/about/about'],

  className: 'about-view',

  events: {
    'click button.about-edit-button': 'editAbout',
    'click button.about-info-save-btn': 'updateAboutInfo',
    'click button.about-info-cancel-btn': 'cancelEditing'
  },

  initialize: function(options) {
    this.state = {};
    this.state.showAboutForm = false;
    this.user = options.model;
    this.aboutTextView = new FosterPals.Views.AboutText({
      model: this.user
    });
    this.aboutFormView = new FosterPals.Views.AboutForm({
      model: this.user
    });
    this.addSubview('.about-text-hook', this.aboutTextView);
    this.addSubview('.about-form-hook', this.aboutFormView);

    this.listenTo(this.user, 'sync change', this.render);
  },

  editAbout: function() {
    this.state.showAboutForm = true;
    this.render();
  },

  cancelEditing: function (e) {
    e.preventDefault();
    this.state.showAboutForm = false;
    this.render();
  },

  updateAboutInfo: function(event) {
    event.preventDefault();
    var $btn = $(event.currentTarget);
    var aboutInfoData = $('#' + $btn.data('form-id')).serializeJSON();
    this.user.set(aboutInfoData);
    this.user.save(
      {},
      {
        success: function() {
          this.state.showAboutForm = false;
        }.bind(this)
      }
    );
  },

  render: function() {
    var content = this.template({ user: this.user, showAboutForm: this.state.showAboutForm });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
