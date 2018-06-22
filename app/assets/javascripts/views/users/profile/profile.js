FosterPals.Views.Profile = Backbone.CompositeView.extend({
  template: JST['users/profile/profile'],

  className: 'profile-view',

  events: {
    'click button.schedule-btn': 'toScheduler',
    'click button.edit-profile-btn': 'editProfile',
    'click button.update-profile-btn': 'updateProfile'
  },

  initialize: function(options) {
    var viewingFromScheduler = options.viewingFromScheduler;
    this.contactIslandView = new FosterPals.Views.ContactIsland({
      model: this.model,
      viewingFromScheduler: viewingFromScheduler
    });
    this.addSubview('.contact-btns', this.contactIslandView);

    var profilePhotoView = new FosterPals.Views.ProfilePhoto({
      model: this.model
    });
    this.addSubview('.profile-photo', profilePhotoView);
    this.listenTo(this.model, 'sync', this.render);
  },

  editProfile: function(event) {
    event.preventDefault();
    $('.modal').modal('toggle');
    this.resetEditFormData();
  },

  resetEditFormData: function() {
    $('input.org-name').val(this.model.attributes.org_name);
    $('input.first-name').val(this.model.attributes.first_name);
    $('input.last-name').val(this.model.attributes.last_name);
    $('input.street-address').val(this.model.attributes.street_address);
    $('input.city').val(this.model.attributes.city);
    $('select.states').val(this.model.attributes.state);
    $('input.zip-code').val(this.model.attributes.zip_code);
  },

  toScheduler: function(event) {
    var $btn = $(event.currentTarget);
    var userId = $btn.data('user-id');

    if ($('.confirmation-view').length === 0) {
      Backbone.history.navigate('users/' + userId + '/scheduler', { trigger: true });
    } else {
      // Remove scheduler, after confirmation of reservation
      Backbone.history.loadUrl();
    }
  },

  updateProfile: function(e) {
    var form = $('#form-update-profile')[0];
    if (!form.checkValidity()) {
      return;
    }
    e.preventDefault();
    var attrs = $(form).serializeJSON().user;
    this.model.save(attrs, {
      success: function() {
        $('.modal').modal('hide');
      },
      error: function(_model, response) {
        console.error(response);
      }
    });
  },

  render: function() {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
