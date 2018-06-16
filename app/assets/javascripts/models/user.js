FosterPals.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  animals_as_org: function() {
    if (!this._animals_as_org) {
      this._animals_as_org = new FosterPals.Collections.Animals();
    }
    return this._animals_as_org;
  },

  animals_as_fosterer: function() {
    if (!this._animals_as_fosterer) {
      this._animals_as_fosterer = new FosterPals.Collections.Animals();
    }
    return this._animals_as_fosterer;
  },

  stays_as_fosterer: function() {
    if (!this._stays_as_fosterer) {
      this._stays_as_fosterer = new FosterPals.Collections.Stays();
    }
    return this._stays_as_fosterer;
  },

  stays_as_org: function() {
    if (!this._stays_as_org) {
      this._stays_as_org = new FosterPals.Collections.Stays();
    }
    return this._stays_as_org;
  },

  parse: function(response) {
    if (response.animals_as_org) {
      this.animals_as_org().set(response.animals_as_org);
      delete response.animals_as_org;
    }

    if (response.animals_as_fosterer) {
      this.animals_as_fosterer().set(response.animals_as_fosterer);
      delete response.animals_as_fosterer;
    }

    if (response.stays_as_fosterer) {
      this.stays_as_fosterer().set(response.stays_as_fosterer);
      delete response.stays_as_fosterer;
    }

    if (response.stays_as_org) {
      this.stays_as_org().set(response.stays_as_org);
      delete response.stays_as_org;
    }
    return response;
  }
});
