import { list, ListConfig } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { Lists } from ".keystone/types";
import slugify from "slugify";

import { text, relationship, timestamp, select } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

export const Post: ListConfig<Lists.Post.TypeInfo, any> | undefined = list({
  access: allowAll,
  fields: {
    title: text({ validation: { isRequired: true } }),
    slug: text({
      isIndexed: "unique",
      isFilterable: true,
      hooks: {
        resolveInput: ({ operation, resolvedData, inputData }) => {
          // Lets only default the slug value on create and only if
          // it isn't supplied by the caller.
          // We probably don't want slugs to change automatically if an
          // item is renamed.
          if (operation === "create" && !inputData.slug) {
            return slugify(inputData.title, {
              remove: /[*+~.()'"!:@/\//]/g,
              lower: true,
            });
          }

          // Since this hook is a the field level we only return the
          // value for this field, not the whole item
          return resolvedData.slug;
        },
      },
    }),
    // Having the status here will make it easy for us to choose whether to display
    // posts on a live site.
    status: select({
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
      ],
      // We want to make sure new posts start off as a draft when they are created
      defaultValue: "draft",
      // fields also have the ability to configure their appearance in the Admin UI
      ui: {
        displayMode: "segmented-control",
      },
    }),
    // The document field can be used for making highly editable content. Check out our
    // guide on the document field https://keystonejs.com/docs/guides/document-fields#how-to-use-document-fields
    // for more information
    content: document({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
      dividers: true,
    }),
    publishDate: timestamp(),
    // Here is the link from post => author.
    // We've configured its UI display quite a lot to make the experience of editing posts better.
    author: relationship({
      ref: "User.posts",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        inlineEdit: { fields: ["name", "email"] },
        linkToItem: true,
        inlineConnect: true,
      },
    }),
    // We also link posts to tags. This is a many <=> many linking.
    tags: relationship({
      ref: "Tag.posts",
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] },
      },
      many: true,
    }),
  },
});
