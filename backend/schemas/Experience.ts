import { list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from ".keystone/types";
import {
    text,
    relationship,
    timestamp,
    select,
    calendarDay,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

export const Experience = list({
    access: allowAll,
    fields: {
        title: text(),
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
        from: calendarDay({ validation: { isRequired: true } }),
        to: calendarDay(),
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
        }),
        // We also link posts to tags. This is a many <=> many linking.
        tags: relationship({
            ref: 'Tag.experiences',
            ui: {
                displayMode: 'cards',
                cardFields: ['name'],
                inlineEdit: { fields: ['name'] },
                linkToItem: true,
                inlineConnect: true,
                inlineCreate: { fields: ['name'] },
            },
            many: true
        })
    }
});