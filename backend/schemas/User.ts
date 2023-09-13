import { Lists } from ".keystone/types";
import { list, ListConfig } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  calendarDay,
  checkbox,
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

export const UserChecklistItem = list({
  access: allowAll,
  fields: {
    checkListItem: relationship({
      ref: "CheckListItem",
      many: false,
      ui: {
        displayMode: "cards",
        cardFields: ["title", "titleNL"],
        inlineConnect: true,
      },
    }),
    checked: checkbox(),
    count: integer(),
    user: relationship({ ref: "User.checkListItems" }),
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
    checkListItems: relationship({
      ref: "UserChecklistItem.user",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["checkListItem", "checked", "count"],
        inlineCreate: { fields: ["checkListItem", "checked", "count"] },
        inlineEdit: { fields: ["checkListItem", "checked", "count"] },
        inlineConnect: true,
      },
    }),
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
