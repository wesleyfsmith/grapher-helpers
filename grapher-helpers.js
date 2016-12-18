const addFilters = (queryObj, options, additionalFilters) => {
  queryObj.$filters = additionalFilters;
  if (!options['$options']) {
    options = {$options: options};
  }
  _.extend(queryObj, options);
};

Meteor.Collection.prototype.findQuery = function() {
  return this.createQuery(this.getFieldsAsObject());
}

Meteor.Collection.prototype.query = function(options) {
  let queryObj = this.getFieldsAsObject();

  addFilters(queryObj, options, {});

  return this.createQuery(queryObj);
}

Meteor.Collection.prototype.findOneQuery = function(id) {
  let queryObj = this.getFieldsAsObject();
  queryObj.$filters = {_id: id};
  return this.createQuery(queryObj);
}

Meteor.Collection.prototype.queryOne = function(id, options) {
  let queryObj = this.getFieldsAsObject();
  options.$options.limit = 1;

  addFilters(queryObj, options, {_id: id})

  //TODO add limit 1 filter?
  return this.createQuery(queryObj);
}

Meteor.Collection.prototype.findCreatedByQuery = function(id) {
  let queryObj = this.getFieldsAsObject();
  if (id) {
    queryObj.$filters = {createdById: id};
  } else {
    queryObj.$filters = {createdById: Meteor.userId()};
  }
  return this.createQuery(queryObj);
}

Meteor.Collection.prototype.queryCreatedBy = function(param, options) { //TODO: is there a cleaner way to do this?
  let queryObj = this.getFieldsAsObject();
  if (typeof param === 'string') {
    addFilters(queryObj, options, {createdById: param})
  }
  if (typeof param === 'object') {
    addFilters(queryObj, param, {createdById: Meteor.userId()});
  }
  return this.createQuery(queryObj);
}

Meteor.Collection.prototype.addLinksWithHelpers = function(links) {
  let collection = this;
  collection.addLinks(links);
  let helpers = {
    getLink(linkName) {
      return collection.getLink(this._id, linkName);
    }
  };
  _.each(links, (value, key) => {
    helpers[key] = function() {
      return collection.getLink(this._id, key).fetch();
    }
  });
  collection.helpers(helpers);
};

export const createdByLink = function(collection) {
  collection.addLinks({
    createdBy: {
      collection: Meteor.users,
      type: 'one',
      field: 'createdById'
    }
  });
  collection.helpers({
    createdBy() {
      return collection.getLink(this._id, 'createdBy').fetch();
    }
  });
  return {
    type: String,
    denyUpdate: true, // for a createdBy, shouldn't be able to update.
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      }
    },
    allowedValues: function () {
      return this.userId;
    },
    autoform: {
      omit: true
    }
  }
}
