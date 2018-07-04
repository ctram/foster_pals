FosterPals.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  isOrg: function() {
    return this.get('role') === 'org';
  },

  parse: function(response) {
    response.animals_as_org = new FosterPals.Collections.Animals(response.animals_as_org);
    response.animals_as_fosterer = new FosterPals.Collections.Animals(response.animals_as_fosterer);
    response.stays_as_fosterer = new FosterPals.Collections.Stays(response.stays_as_fosterer);
    response.stays_as_org = new FosterPals.Collections.Stays(response.stays_as_org);
    return response;
  }
});
