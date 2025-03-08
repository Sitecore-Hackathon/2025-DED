export const UpdateQueryTemplate = `
mutation UpdateItem {
    updateItem(
        input: {
            path: pathFragment
            languageFragment
            fields: [
                fieldsFragment
            ]
            }
        )
        {
            item {
                name
            }
            }
        }`;
