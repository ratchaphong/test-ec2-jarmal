## 📦 Prisma Database Schema Overview

This project uses **Prisma ORM** with **PostgreSQL** to define the database schema.  
Below is the complete structure of the data models and their relationships.

---

### 🧑‍💼 `User`

| Field       | Type       | Description                        |
| ----------- | ---------- | ---------------------------------- |
| `id`        | `String`   | Primary Key (UUID)                 |
| `name`      | `String`   | Name of the user                   |
| `email`     | `String`   | Unique Email                       |
| `profile`   | `Profile?` | Optional relation to Profile (1:1) |
| `posts`     | `Post[]`   | Relation to Posts (1:N)            |
| `createdAt` | `DateTime` | Timestamp of creation              |

---

### 👤 `Profile`

| Field    | Type      | Description            |
| -------- | --------- | ---------------------- |
| `id`     | `String`  | Primary Key (UUID)     |
| `bio`    | `String?` | Short bio (optional)   |
| `userId` | `String`  | Unique FK to User      |
| `user`   | `User`    | Relation to User (1:1) |

---

### 📝 `Post`

| Field        | Type         | Description                         |
| ------------ | ------------ | ----------------------------------- |
| `id`         | `String`     | Primary Key (UUID)                  |
| `title`      | `String`     | Title of the post                   |
| `content`    | `String?`    | Post content (optional)             |
| `published`  | `Boolean`    | Post publication status             |
| `authorId`   | `String`     | FK to User                          |
| `author`     | `User`       | Relation to User (N:1)              |
| `categories` | `Category[]` | Many-to-Many relation to Categories |
| `comments`   | `Comment[]`  | 1:N relation to Comments            |
| `createdAt`  | `DateTime`   | Timestamp of creation               |

---

### 🏷️ `Category`

| Field   | Type     | Description             |
| ------- | -------- | ----------------------- |
| `id`    | `String` | Primary Key (UUID)      |
| `name`  | `String` | Category name           |
| `posts` | `Post[]` | Relation to Posts (N:M) |

---

### 💬 `Comment`

| Field       | Type        | Description                    |
| ----------- | ----------- | ------------------------------ |
| `id`        | `String`    | Primary Key (UUID)             |
| `content`   | `String`    | Content of the comment         |
| `postId`    | `String`    | FK to Post                     |
| `post`      | `Post`      | Relation to Post (N:1)         |
| `parentId`  | `String?`   | Self-referencing FK (optional) |
| `parent`    | `Comment?`  | Parent comment (optional)      |
| `replies`   | `Comment[]` | Replies to this comment (1:N)  |
| `createdAt` | `DateTime`  | Timestamp of creation          |

---

### 🧭 Entity Relationship Summary

- `User` ↔ `Profile`: One-to-One
- `User` → `Post[]`: One-to-Many
- `Post` ↔ `Category[]`: Many-to-Many
- `Post` → `Comment[]`: One-to-Many
- `Comment` ↔ `Comment`: Self-relation (Replies)

---
