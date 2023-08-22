# Part 1

## Q 1

You can copy this and use it as a filte

```json
{
  "age": {
    "$gt": 25
  }
}
```

## Q 2

You can paste this command on mongo shell

```js
/**
 * Given the document is stored in `user` collection
 */
db.user.updateOne(
  {
    _id: ObjectId('64e06ceaf342fbf7f3d14587'),
  },
  {
    $set: {
      email: 'jane.updated@example.com',
    },
  }
);
```

## Q3

You can paste this command on mongo shell

```js
db.user.find({ status: 'inactive' });

db.user.deleteMany({ status: 'inactive' });

db.user.find({ status: 'inactive' });
```

# Part 2

```sh
npx nx serve part-2
```

head to: http://localhost:3003

# Part 3

```sh
npx nx serve part-3
```

head to: http://localhost:4201

# Part 4

## Q1

```sh
npx nx serve part-4 --args q-1
```

## Q2

You can import postman collection provided in this repo

```sh
npx nx serve part-4 --args q-2
```

## Q3

```sh
npx nx serve part-4 --args q-3
```

# Part 5

```sh
npx nx run-many --projects=part-5-fe,part-5-be --target=serve
```
