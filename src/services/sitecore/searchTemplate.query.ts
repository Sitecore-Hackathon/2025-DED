export const SearchQueryTemplate = `
{
    pageOne: search(
        where: {
        AND: [
                {
                    OR: [
                        templatesFragment
                    ]
                }
                {
                    OR:[
                        pathsFragment
                    ]
                }
            ]
        }
        first: 250
        ) {
        total
        pageInfo {
            endCursor
            hasNext
            }
        results {
            name
            id
            url {
                path
            }
            fieldsFragment
        }
    }
}`;
