import { ClientWrapper } from "./src/core/index.js";
export {
  type Callbacks,
  type Flag,
  type CRUDOptions,
  type UpdateTableOpts,
  type GetTableOpts,
  type TableBehaviour,
} from "./src/types/index.js";

const profiles = new ClientWrapper<{
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}>("" as any, "profiles", {
  supportsSoftDeletion: true,
  softDeleteConfig: { flagKey: "is_deleted", timestampKey: "deleted_at" },
  debug: { returnHintsOnError: true },
});

profiles.get({
  eq: [
    { key: "id", value: "some-id" },
    { key: "name", value: "John Doe" },
  ],
  inValue: {
    key: "email",
    value: ["value@example.com", "another@example.com"],
  },
  contains: [{ key: "name", value: "John" }],
  overlaps: [
    { key: "email", value: ["value@example.com", "another@example.com"] },
  ],
});

profiles.batchUpdate(
  { email: "example@admin.com" },
  { eq: [{ key: "role", value: "admin" }] }
);

profiles.updateOneById("some-id", { role: "admin" });

profiles.createOne(
  {
    name: "John Doe",
    email: "john@example.com",
    role: "user",
  },
  {
    onLoadingStateChange(state) {
      console.log("Loading state changed:", state);
    },
  }
);

profiles.createMany([
  {
    name: "John Doe",
    email: "john@example.com",
    role: "user",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
  },
]);

profiles.deleteOneByIDPermanent("some-id");

profiles.toggleSoftDeleteOneById("some-id", true);

export default ClientWrapper;
