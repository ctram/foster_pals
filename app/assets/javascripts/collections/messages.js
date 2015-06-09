FosterPals.Collections.Messages = Backbone.Collection.extend({
  model: FosterPals.Models.Message,

  getOrFetch: function (id) {
    var messages = this;
    var message = messages.get(id);
    if (!message) {
      message = new FosterPals.Models.Message({
        id : id
      });
      message.fetch({
        success: function (model, response, options) {
          messages.add(model);
        }
      });
    } else {
      message.fetch();
    }
    return message;
  }
});

FosterPals.Collections.messages = new FosterPals.Collections.Messages();
