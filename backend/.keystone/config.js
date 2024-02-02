"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_dotenv2 = __toESM(require("dotenv"));
var import_core8 = require("@keystone-6/core");

// schemas/CheckListItem.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var CheckListItem = (0, import_core.list)({
  access: import_access.allowAll,
  ui: {
    listView: {
      initialColumns: ["titleNL", "tags", "checked"]
    }
  },
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
    }),
    image: (0, import_fields.relationship)({ ref: "CheckListItemImage.checkListItem" })
  }
});

// schemas/CheckListItemImage.ts
var import_config = require("dotenv/config");
var import_fields2 = require("@keystone-6/core/fields");
var import_core2 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_cloudinary = require("@keystone-6/cloudinary");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config({ path: `.env.${process.env.NODE_ENV}` });
var cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: "estherkool.com"
};
var CheckListItemImage = (0, import_core2.list)({
  access: import_access2.allowAll,
  fields: {
    image: (0, import_cloudinary.cloudinaryImage)({
      cloudinary,
      label: "Source"
    }),
    altText: (0, import_fields2.text)(),
    checkListItem: (0, import_fields2.relationship)({ ref: "CheckListItem.image" })
  },
  ui: {
    listView: {
      initialColumns: ["image", "altText", "product"]
    }
  }
});

// schemas/Experience.ts
var import_core3 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var Experience = (0, import_core3.list)({
  access: import_access3.allowAll,
  fields: {
    title: (0, import_fields3.text)(),
    titleNL: (0, import_fields3.text)({ label: "Titel (NL)" }),
    // Having the status here will make it easy for us to choose whether to display
    // posts on a live site.
    status: (0, import_fields3.select)({
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
    summary: (0, import_fields3.text)({
      ui: {
        displayMode: "textarea"
      },
      validation: {
        length: {
          max: 160
        }
      }
    }),
    summaryNL: (0, import_fields3.text)({
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
    publishDate: (0, import_fields3.timestamp)({ defaultValue: { kind: "now" } }),
    from: (0, import_fields3.calendarDay)({ validation: { isRequired: true } }),
    to: (0, import_fields3.calendarDay)(),
    ongoing: (0, import_fields3.checkbox)({ defaultValue: false }),
    // Here is the link from post => author.
    // We've configured its UI display quite a lot to make the experience of editing posts better.
    author: (0, import_fields3.relationship)({
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
    tags: (0, import_fields3.relationship)({
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
    organisation: (0, import_fields3.relationship)({
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
var import_core4 = require("@keystone-6/core");
var import_access4 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");
var Organisation = (0, import_core4.list)({
  access: import_access4.allowAll,
  fields: {
    name: (0, import_fields4.text)(),
    nameNL: (0, import_fields4.text)({ label: "Naam (NL)" }),
    experiences: (0, import_fields4.relationship)({ ref: "Experience.organisation", many: true }),
    logo: (0, import_fields4.text)()
  }
});

// schemas/Post.ts
var import_core5 = require("@keystone-6/core");
var import_access5 = require("@keystone-6/core/access");
var import_slugify = __toESM(require("slugify"));
var import_fields5 = require("@keystone-6/core/fields");
var import_fields_document2 = require("@keystone-6/fields-document");
var Post = (0, import_core5.list)({
  access: import_access5.allowAll,
  fields: {
    title: (0, import_fields5.text)({ validation: { isRequired: true } }),
    slug: (0, import_fields5.text)({
      isIndexed: "unique",
      isFilterable: true,
      hooks: {
        resolveInput: ({ operation, resolvedData, inputData }) => {
          if (operation === "create" && !inputData.slug) {
            return (0, import_slugify.default)(inputData.title, {
              remove: /[*+~.()'"!:@/\//]/g,
              lower: true
            });
          }
          return resolvedData.slug;
        }
      }
    }),
    // Having the status here will make it easy for us to choose whether to display
    // posts on a live site.
    status: (0, import_fields5.select)({
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
    publishDate: (0, import_fields5.timestamp)(),
    // Here is the link from post => author.
    // We've configured its UI display quite a lot to make the experience of editing posts better.
    author: (0, import_fields5.relationship)({
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
    tags: (0, import_fields5.relationship)({
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
var import_core6 = require("@keystone-6/core");
var import_access6 = require("@keystone-6/core/access");
var import_fields6 = require("@keystone-6/core/fields");
var Tag = (0, import_core6.list)({
  access: import_access6.allowAll,
  fields: {
    name: (0, import_fields6.text)(),
    nameNL: (0, import_fields6.text)({ label: "Tag (NL)" }),
    posts: (0, import_fields6.relationship)({ ref: "Post.tags", many: true }),
    experiences: (0, import_fields6.relationship)({ ref: "Experience.tags", many: true }),
    checkListItems: (0, import_fields6.relationship)({ ref: "CheckListItem.tags", many: true })
  }
});

// schemas/User.ts
var import_core7 = require("@keystone-6/core");
var import_access7 = require("@keystone-6/core/access");
var import_fields7 = require("@keystone-6/core/fields");
var Height = (0, import_core7.list)({
  access: import_access7.allowAll,
  fields: {
    cm: (0, import_fields7.integer)({ label: "Height (in cm)" }),
    createdAt: (0, import_fields7.timestamp)({ defaultValue: { kind: "now" } })
  }
});
var Weight = (0, import_core7.list)({
  access: import_access7.allowAll,
  fields: {
    g: (0, import_fields7.integer)({ label: "Weight (in g)" }),
    createdAt: (0, import_fields7.timestamp)({ defaultValue: { kind: "now" } })
  }
});
var UserChecklistItem = (0, import_core7.list)({
  access: import_access7.allowAll,
  fields: {
    checkListItem: (0, import_fields7.relationship)({
      ref: "CheckListItem",
      many: false,
      ui: {
        displayMode: "cards",
        cardFields: ["title", "titleNL"],
        inlineConnect: true
      }
    }),
    checked: (0, import_fields7.checkbox)(),
    count: (0, import_fields7.integer)(),
    user: (0, import_fields7.relationship)({ ref: "User.checkListItems" })
  }
});
var User = (0, import_core7.list)({
  access: import_access7.allowAll,
  fields: {
    name: (0, import_fields7.text)({ validation: { isRequired: true } }),
    email: (0, import_fields7.text)({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true
    }),
    password: (0, import_fields7.password)({ validation: { isRequired: true } }),
    posts: (0, import_fields7.relationship)({ ref: "Post.author", many: true }),
    experiences: (0, import_fields7.relationship)({ ref: "Experience.author", many: true }),
    checkListItems: (0, import_fields7.relationship)({
      ref: "UserChecklistItem.user",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["checkListItem", "checked", "count"],
        inlineCreate: { fields: ["checkListItem", "checked", "count"] },
        inlineEdit: { fields: ["checkListItem", "checked", "count"] },
        inlineConnect: true
      }
    }),
    birthdate: (0, import_fields7.calendarDay)(),
    height: (0, import_fields7.relationship)({
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
    weight: (0, import_fields7.relationship)({
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
  CheckListItemImage,
  Experience,
  Height,
  Organisation,
  Post,
  Tag,
  User,
  UserChecklistItem,
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
    sessionSecret = process.env.SESSION_SECRET;
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
  maxAge: sessionMaxAge,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production"
});

// keystone.ts
import_dotenv2.default.config({ path: `.env.${process.env.NODE_ENV}` });
var databaseURL = process.env.DATABASE_URL || "";
var frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
var keystone_default = withAuth(
  // Using the config function helps typescript guide you to the available options.
  (0, import_core8.config)({
    server: {
      cors: {
        origin: [frontendUrl, /\.estherkool\.com$/],
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
//# sourceMappingURL=config.js.map
