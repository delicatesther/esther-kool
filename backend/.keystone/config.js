"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  PORT: () => PORT,
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_config = require("dotenv/config");
var import_core7 = require("@keystone-6/core");

// schemas/CheckListItem.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var CheckListItem = (0, import_core.list)({
  access: import_access.allowAll,
  fields: {
    title: (0, import_fields.text)(),
    titleNL: (0, import_fields.text)({ label: "Titel (NL)" }),
    checked: (0, import_fields.checkbox)(),
    amount: (0, import_fields.integer)(),
    description: (0, import_fields.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    descriptionNL: (0, import_fields.text)({
      label: "Samenvatting (NL)",
      ui: {
        displayMode: "textarea"
      },
      validation: {
        length: {
          max: 160
        }
      }
    }),
    publishDate: (0, import_fields.timestamp)({ defaultValue: { kind: "now" } }),
    // We also link posts to tags. This is a many <=> many linking.
    tags: (0, import_fields.relationship)({
      ref: "Tag.checkListItems",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "nameNL"],
        inlineEdit: { fields: ["name", "nameNL"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name", "nameNL"] }
      },
      many: true
    })
  }
});

// schemas/Experience.ts
var import_core2 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var Experience = (0, import_core2.list)({
  access: import_access2.allowAll,
  fields: {
    title: (0, import_fields2.text)(),
    titleNL: (0, import_fields2.text)({ label: "Titel (NL)" }),
    // Having the status here will make it easy for us to choose whether to display
    // posts on a live site.
    status: (0, import_fields2.select)({
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" }
      ],
      // We want to make sure new posts start off as a draft when they are created
      defaultValue: "draft",
      // fields also have the ability to configure their appearance in the Admin UI
      ui: {
        displayMode: "segmented-control"
      }
    }),
    summary: (0, import_fields2.text)({
      ui: {
        displayMode: "textarea"
      },
      validation: {
        length: {
          max: 160
        }
      }
    }),
    summaryNL: (0, import_fields2.text)({
      label: "Samenvatting (NL)",
      ui: {
        displayMode: "textarea"
      },
      validation: {
        length: {
          max: 160
        }
      }
    }),
    // The document field can be used for making highly editable content. Check out our
    // guide on the document field https://keystonejs.com/docs/guides/document-fields#how-to-use-document-fields
    // for more information
    content: (0, import_fields_document.document)({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1]
      ],
      links: true,
      dividers: true
    }),
    contentNL: (0, import_fields_document.document)({
      label: "Inhoud (NL)",
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1]
      ],
      links: true,
      dividers: true
    }),
    publishDate: (0, import_fields2.timestamp)({ defaultValue: { kind: "now" } }),
    from: (0, import_fields2.calendarDay)({ validation: { isRequired: true } }),
    to: (0, import_fields2.calendarDay)(),
    // Here is the link from post => author.
    // We've configured its UI display quite a lot to make the experience of editing posts better.
    author: (0, import_fields2.relationship)({
      ref: "User.experiences",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        inlineEdit: { fields: ["name", "email"] },
        linkToItem: true,
        inlineConnect: true
      },
      hooks: {
        resolveInput({ resolvedData, operation, context }) {
          if (operation === "create") {
            return {
              connect: { id: context.session.itemId }
            };
          }
          return resolvedData.user;
        }
      }
    }),
    // We also link posts to tags. This is a many <=> many linking.
    tags: (0, import_fields2.relationship)({
      ref: "Tag.experiences",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "nameNL"],
        inlineEdit: { fields: ["name", "nameNL"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name", "nameNL"] }
      },
      many: true
    }),
    organisation: (0, import_fields2.relationship)({
      ref: "Organisation.experiences",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "nameNL", "logo"],
        inlineEdit: { fields: ["name", "nameNL", "logo"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name", "nameNL", "logo"] }
      }
    })
  }
});

// schemas/Organisation.ts
var import_core3 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var Organisation = (0, import_core3.list)({
  access: import_access3.allowAll,
  fields: {
    name: (0, import_fields3.text)(),
    nameNL: (0, import_fields3.text)({ label: "Naam (NL)" }),
    experiences: (0, import_fields3.relationship)({ ref: "Experience.organisation", many: true }),
    logo: (0, import_fields3.text)()
  }
});

// schemas/Post.ts
var import_core4 = require("@keystone-6/core");
var import_access4 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");
var import_fields_document2 = require("@keystone-6/fields-document");
var Post = (0, import_core4.list)({
  access: import_access4.allowAll,
  fields: {
    title: (0, import_fields4.text)(),
    // Having the status here will make it easy for us to choose whether to display
    // posts on a live site.
    status: (0, import_fields4.select)({
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" }
      ],
      // We want to make sure new posts start off as a draft when they are created
      defaultValue: "draft",
      // fields also have the ability to configure their appearance in the Admin UI
      ui: {
        displayMode: "segmented-control"
      }
    }),
    // The document field can be used for making highly editable content. Check out our
    // guide on the document field https://keystonejs.com/docs/guides/document-fields#how-to-use-document-fields
    // for more information
    content: (0, import_fields_document2.document)({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1]
      ],
      links: true,
      dividers: true
    }),
    publishDate: (0, import_fields4.timestamp)(),
    // Here is the link from post => author.
    // We've configured its UI display quite a lot to make the experience of editing posts better.
    author: (0, import_fields4.relationship)({
      ref: "User.posts",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        inlineEdit: { fields: ["name", "email"] },
        linkToItem: true,
        inlineConnect: true
      }
    }),
    // We also link posts to tags. This is a many <=> many linking.
    tags: (0, import_fields4.relationship)({
      ref: "Tag.posts",
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] }
      },
      many: true
    })
  }
});

// schemas/Tag.ts
var import_core5 = require("@keystone-6/core");
var import_access5 = require("@keystone-6/core/access");
var import_fields5 = require("@keystone-6/core/fields");
var Tag = (0, import_core5.list)({
  access: import_access5.allowAll,
  ui: {
    isHidden: true
  },
  fields: {
    name: (0, import_fields5.text)(),
    nameNL: (0, import_fields5.text)({ label: "Tag (NL)" }),
    posts: (0, import_fields5.relationship)({ ref: "Post.tags", many: true }),
    experiences: (0, import_fields5.relationship)({ ref: "Experience.tags", many: true }),
    checkListItems: (0, import_fields5.relationship)({ ref: "CheckListItem.tags", many: true })
  }
});

// schemas/User.ts
var import_core6 = require("@keystone-6/core");
var import_access6 = require("@keystone-6/core/access");
var import_fields6 = require("@keystone-6/core/fields");
var Height = (0, import_core6.list)({
  access: import_access6.allowAll,
  fields: {
    cm: (0, import_fields6.integer)({ label: "Height (in cm)" }),
    createdAt: (0, import_fields6.timestamp)({ defaultValue: { kind: "now" } })
  }
});
var Weight = (0, import_core6.list)({
  access: import_access6.allowAll,
  fields: {
    g: (0, import_fields6.integer)({ label: "Weight (in g)" }),
    createdAt: (0, import_fields6.timestamp)({ defaultValue: { kind: "now" } })
  }
});
var User = (0, import_core6.list)({
  access: import_access6.allowAll,
  fields: {
    name: (0, import_fields6.text)({ validation: { isRequired: true } }),
    email: (0, import_fields6.text)({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true
    }),
    password: (0, import_fields6.password)({ validation: { isRequired: true } }),
    posts: (0, import_fields6.relationship)({ ref: "Post.author", many: true }),
    experiences: (0, import_fields6.relationship)({ ref: "Experience.author", many: true }),
    birthdate: (0, import_fields6.calendarDay)(),
    height: (0, import_fields6.relationship)({
      ref: "Height",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["cm"],
        inlineCreate: { fields: ["cm"] },
        inlineEdit: { fields: ["cm"] },
        inlineConnect: false
      }
    }),
    weight: (0, import_fields6.relationship)({
      ref: "Weight",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["g"],
        inlineCreate: { fields: ["g"] },
        inlineEdit: { fields: ["g"] },
        inlineConnect: false
      }
    })
  },
  ui: {
    listView: {
      initialColumns: ["name", "posts"]
    }
  }
});

// schema.ts
var lists = {
  CheckListItem,
  Experience,
  Height,
  Organisation,
  Post,
  Tag,
  User,
  Weight
};

// auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET || require("crypto").randomBytes(32).toString("base64").replace(/[^a-zA-Z0-9]+/g, "");
if (!sessionSecret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "The SESSION_SECRET environment variable must be set in production"
    );
  } else {
    sessionSecret = process.env.COOKIE_SECRET;
  }
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name id email",
  secretField: "password",
  initFirstItem: {
    // If there are no items in the database, keystone will ask you to create
    // a new user, filling in these fields.
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  secret: sessionSecret,
  maxAge: sessionMaxAge
});

// keystone.ts
var databaseURL = process.env.DATABASE_URL || "https://xoolgtbnrumkdxlowjad.supabase.co";
var frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
var PORT = parseInt(process.env.PORT) || 3010;
var keystone_default = withAuth(
  // Using the config function helps typescript guide you to the available options.
  (0, import_core7.config)({
    server: {
      port: PORT,
      cors: {
        origin: frontendUrl,
        // Passes along cookie
        credentials: true
      }
    },
    db: {
      provider: "postgresql",
      url: databaseURL,
      // onConnect: async context => { /* ... */ },
      // Optional advanced configuration
      enableLogging: true,
      useMigrations: true,
      idField: { kind: "uuid" }
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data
    },
    lists,
    session
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PORT
});
