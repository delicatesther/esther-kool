import { Lists } from ".keystone/types";
import { list, ListConfig } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  calendarDay,
  integer,
  password,
  relationship,
  text,
  timestamp,
} from "@keystone-6/core/fields";

export const Height = list({
  access: allowAll,
  fields: {
    cm: integer({ label: "Height (in cm)" }),
    createdAt: timestamp({ defaultValue: { kind: "now" } }),
  },
});

export const Weight = list({
  access: allowAll,
  fields: {
    g: integer({ label: "Weight (in g)" }),
    createdAt: timestamp({ defaultValue: { kind: "now" } }),
  },
});

export const User = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true,
    }),
    password: password({ validation: { isRequired: true } }),
    posts: relationship({ ref: "Post.author", many: true }),
    experiences: relationship({ ref: "Experience.author", many: true }),
    checkListItems: relationship({ ref: "CheckListItem.users", many: true }),
    birthdate: calendarDay(),
    height: relationship({
      ref: "Height",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["cm"],
        inlineCreate: { fields: ["cm"] },
        inlineEdit: { fields: ["cm"] },
        inlineConnect: false,
      },
    }),
    weight: relationship({
      ref: "Weight",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["g"],
        inlineCreate: { fields: ["g"] },
        inlineEdit: { fields: ["g"] },
        inlineConnect: false,
      },
    }),
  },
  ui: {
    listView: {
      initialColumns: ["name", "posts"],
    },
  },
});
