# Supabase CRUD Wrapper

A fully generic, **TypeScript-first CRUD wrapper** built on top of **Supabase** that provides a clean and developer-friendly API similar to ORMs / ODMs like Mongoose.

This package helps eliminate repetitive CRUD boilerplate by exposing reusable methods such as:

- `createOne()`
- `updateOneById()`
- `getById()`
- `get()`
- `batchUpdate()`
- `deleteOneByIDPermanent()`
- `toogleSoftDeleteOneById()`

It also includes:

- Strong TypeScript support
- Built-in error handling
- Payload validation / cleanup
- Loading state callbacks
- Conditional payload amendments
- Flexible filtering system
- Soft delete support

---

## Why This Package?

When working with Supabase, developers often repeat the same CRUD logic for every table.

Example:

```ts
await supabase.from("users").update(payload).eq("id", userId);
```

This gets repeated across:

- users
- projects
- tasks
- products
- content rows
- any other table

This package abstracts all of that into a reusable class-based wrapper.

---

## Features

- Fully generic CRUD wrapper
- Strong TypeScript support
- Flexible query filters
- Reusable error classes
- Consistent response structure
- Soft delete support
- Batch update support
- Search and sorting support
- Callback support for UI loading states

---

## Folder Structure

```text
src/
│
├── core/
│   ├── crud-wrapper/
│   ├── response/
│   ├── errors/
│
├── helpers/
│   ├── validators/
│
├── types/
│
└── index.ts
```

---

## Architecture

```text
Consumer App
     ↓
CRUDWrapper
     ↓
Validators / Errors / Helpers
     ↓
Supabase SDK
     ↓
Postgres Database
```

---

## Installation

```bash
npm install PACKAGE_NAME
```

---

## Basic Usage

```ts
import { CRUDWrapper } from "PACKAGE_NAME";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(URL, KEY);

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserPayload {
  name?: string;
  email?: string;
}

const users = new CRUDWrapper<User, UserPayload>(supabase, "users");
```

---

## Methods

### Create One

```ts
const response = await users.createOne({
  name: "John",
  email: "john@example.com",
});
```

---

### Update By ID

```ts
const response = await users.updateOneById("123", {
  name: "Updated Name",
});
```

---

### Get By ID

```ts
const response = await users.getById("123");
```

---

### Get With Filters

```ts
const response = await users.get({
  eq: [
    {
      key: "is_active",
      value: true,
    },
  ],
});
```

---

### Batch Update

```ts
const response = await users.batchUpdate(
  {
    role: "inactive_user",
  },
  {
    eq: [
      {
        key: "is_active",
        value: false,
      },
    ],
  }
);
```

---

### Delete Permanently

```ts
await users.deleteOneByIDPermanent("123");
```

---

### Soft Delete

```ts
await users.toogleSoftDeleteOneById("123", true);
```

---

## Loading Callback Support

Useful for frontend applications:

```ts
await users.get(
  {},
  {
    onLoadingStateChange: (loading) => {
      console.log(loading);
    },
  }
);
```

---

## Amend Payload Before Request

Allows conditional payload modifications before request execution:

```ts
await users.createOne(
  {
    name: "John",
  },
  {
    amendArgs: ({ formData }) => ({
      ...formData,
      created_at: new Date().toISOString(),
    }),
  }
);
```

---

## Response Format

All methods return a standardized response:

```ts
{
  data: ...,
  error: ...,
  flag: ...
}
```

This ensures consistent handling across all operations.

---

## Error Handling

Includes reusable custom error classes:

- `BaseError`
- `APIError`
- `ValidationError`
- `InternalError`

These are internally mapped to standardized API responses.

---

## Build

To build the package:

```bash
npm run build
```

This compiles:

```text
src/
```

into:

```text
dist/
```

---

## Production Notes

Keep `src` for development.

Only publish `dist` in npm package.

Recommended `package.json`:

```json
{
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist", "README.md"]
}
```

---

## Future Scope

Planned improvements:

- pagination helpers
- middleware hooks
- query builder extensions
- transactions
- caching
- audit logging
- plugin architecture

---

## License

MIT
