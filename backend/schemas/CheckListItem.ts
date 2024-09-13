import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  text,
  relationship,
  timestamp,
  checkbox,
  integer,
} from "@keystone-6/core/fields";

export const CheckListItem = list({
  access: allowAll,
  ui: {
    listView: {
      initialColumns: ["titleNL", "tags", "checked"],
      initialSort: { field: "titleNL", direction: "ASC" },
      pageSize: 100,
    },
  },
  fields: {
    title: text(),
    titleNL: text({ label: "Titel (NL)" }),
    checked: checkbox(),
    amount: integer(),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    descriptionNL: text({
      label: "Samenvatting (NL)",
      ui: {
        displayMode: "textarea",
      },
      validation: {
        length: {
          max: 160,
        },
      },
    }),
    publishDate: timestamp({ defaultValue: { kind: "now" } }),
    // We also link posts to tags. This is a many <=> many linking.
    tags: relationship({
      ref: "Tag.checkListItems",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "nameNL"],
        inlineEdit: { fields: ["name", "nameNL"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name", "nameNL"] },
      },
      many: true,
    }),
    image: relationship({ ref: "CheckListItemImage.checkListItem" }),
  },
});
