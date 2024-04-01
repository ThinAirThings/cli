export type ThinairConfig = {
    organizations: {
        [key: string]: {
            githubToken: string
        }
    },
    defaultOrganization: string
}