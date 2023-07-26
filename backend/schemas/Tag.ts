import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, relationship } from '@keystone-6/core/fields';

export const Tag = list({
    access: allowAll,
    ui: {
        isHidden: true,
    },
    fields: {
        name: text(),
        nameNL: text({label: "Tag (NL)"}),
        posts: relationship({ ref: 'Post.tags', many: true }),
        experiences: relationship({ ref: 'Experience.tags', many: true }),
    },
});