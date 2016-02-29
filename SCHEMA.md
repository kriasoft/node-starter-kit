# GraphQL Schema

```
type Location {
  city: String
  country: String
}

type User {
  id: String!
  name: String
  location: Location
  avatar(size: Int): Url,
  stories: [Story]
  comments: [Comment]
  activity: [Topic]
}

interface Topic {
  id: String!
  title: String
  text: String
}

type Story : Topic {
  id: String!
  author: User
  dateline: {
     when: DateTime
     where: Location
  }
  title: String
  text: String
  comments: [Comment]
  categories: [Category]
}

type Comment : Topic {
  id: String!
  author: User
  dateline: {
     when: DateTime
     where: Location
  }
  title: String
  text: String
}

type Category {
  name: String!
  description: String
  Stories: [Story]
}

type QueryRoot {
  me: User
  user(userId: String!): User
  story(storyId: String!): Story
  comment(commentId: String!): Comment
  category(categoryId: String!): Category
  users: [User]
  stories: [Story]
  comments: [Comment]
  activity: [Topics]
  categories: [Category]
}
```
