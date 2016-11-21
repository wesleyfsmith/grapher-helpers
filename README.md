## grapher-helpers

Provides common grapher querires out of the box, as well as creates helper methods for links providing a more OOP syntax.

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

### Common queries
Most often you want to query and object 
