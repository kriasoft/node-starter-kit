# GraphQL Schema

```
type User {
  id: ID!,
  name: String,
  email: String,
  picture(size: Int): Url,
  friends: [User]!
}

type Event {
  id: ID!,
  title: String!,
  location: String!,
  attendees: [User]!
}

type QueryRoot {
  me: User,
  events: [Event]!
}
```
