import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, relationship } from '@keystone-6/core/fields';

export const Organisation = list({
    access: allowAll,
    fields: {
        name: text(),
        nameNL: text({label: "Naam (NL)"}),
        experiences: relationship({ ref: 'Experience.organisation', many: true }),
        logo: text()
    },
});