## grapher-helpers

Provides common [cultofcoders:grapher](https://github.com/cult-of-coders/grapher) querires out of the box, as well as creates helper methods for links providing a more OOP syntax.

To install:

```meteor add wesleyfsmith:grapher-helpers```

### Creating helpers from links
Now, when you define your links you can automatically create associated helpers. Let's say you have a Mongo.Collection called Practices.

```js
Practices.addLinksWithHelpers({
  employees: {
    collection: Meteor.users,
    type: 'many',
    field: 'employeeIds'
  }
});
```

And then you can call:

```js
let practice = Practices.findOne();
practice.employees() // returns all employees
```

Which is the equivalent of:

```js
let practice = Practices.findOne();
Practices.findLink(practice._id, 'employees').fetch();
```

Note that if you haven't subscribed to the appropriate documents these helpers won't return anything.

### Common queries
Most often you want to query an object and just get all the fields by default. With you package you can do this by running:

```js
let query = Practices.findQuery()
```

This creates a query that will grab all the fields off the collections' simple schema.

If you want to only query a single document you can run:

```js
let query = Practices.findOneQuery('id')
```
This creates a query that will grab all the fields off the collections' simple schema, and then only query for that one document.
