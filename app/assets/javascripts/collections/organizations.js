FosterPals.Collections.Organizations = Backbone.Collection.extend({
  model: FosterPals.Models.Organization,

  getOrFetch: function (id) {
    var organizations = this;
    var organization = organizations.get(id);
    if (!organization) {
      organization = new FosterPals.Models.Organization({
        id : id
      });
      organization.fetch({
        success: function (model, response, options) {
          organizations.add(model);
        }
      });
    } else {
      organization.fetch();
    }
    return organization;
  }
});

FosterPals.Collections.organizations = new FosterPals.Collections.Organizations();
