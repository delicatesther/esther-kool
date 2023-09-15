import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
    text,
    relationship,
    timestamp,
    select,
    calendarDay,
    checkbox,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

export const Experience = list({
    access: allowAll,
    fields: {
        title: text(),
        titleNL: text({ label: "Titel (NL)" }),
        // Having the status here will make it easy for us to choose whether to display
        // posts on a live site.
        status: select({
            options: [
                { label: 'Published', value: 'published' },
                { label: 'Draft', value: 'draft' },
            ],
            // We want to make sure new posts start off as a draft when they are created
            defaultValue: 'draft',
            // fields also have the ability to configure their appearance in the Admin UI
            ui: {
                displayMode: 'segmented-control',
            },
        }),
        summary: text({
            ui: {
                displayMode: 'textarea'
            },
            validation: {
                length: {
                    max: 160
                }
            }
        }),
        summaryNL: text({
            label: "Samenvatting (NL)",
            ui: {
                displayMode: 'textarea'
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
        contentNL: document({
            label: "Inhoud (NL)",
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
        publishDate: timestamp({ defaultValue: { kind: 'now' } }),
        from: calendarDay({ validation: { isRequired: true } }),
        to: calendarDay(),
        ongoing: checkbox({ defaultValue: false }),
        // Here is the link from post => author.
        // We've configured its UI display quite a lot to make the experience of editing posts better.
        author: relationship({
            ref: 'User.experiences',
            ui: {
                displayMode: 'cards',
                cardFields: ['name', 'email'],
                inlineEdit: { fields: ['name', 'email'] },
                linkToItem: true,
                inlineConnect: true,
            },
            hooks: {
                resolveInput({ resolvedData, operation, context }) {
                    if (operation === 'create') {
                        return {
                            connect: { id: context.session.itemId },
                        };
                    }
                    return resolvedData.user;
                },
            },
        }),
        // We also link posts to tags. This is a many <=> many linking.
        tags: relationship({
            ref: 'Tag.experiences',
            ui: {
                displayMode: 'cards',
                cardFields: ['name', 'nameNL'],
                inlineEdit: { fields: ['name', 'nameNL'] },
                linkToItem: true,
                inlineConnect: true,
                inlineCreate: { fields: ['name', 'nameNL'] },
            },
            many: true
        }),
        organisation: relationship({
            ref: 'Organisation.experiences',
            ui: {
                displayMode: 'cards',
                cardFields: ['name', 'nameNL', 'logo'],
                inlineEdit: { fields: ['name', 'nameNL', 'logo'] },
                linkToItem: true,
                inlineConnect: true,
                inlineCreate: { fields: ['name', 'nameNL', 'logo'] },
            },
        })
    }
});