import { readFileSync } from "fs"
import path from "path"
import os from "os"


export type ThinAirConfig = {
    organizations: {
        [key: string]: {
            githubToken: string
        }
    },
    defaultOrganization: string
}

export const getThinairConfig = () => {
    return JSON.parse(readFileSync(path.join(os.homedir(), '.thinair', 'config')).toString()) as ThinAirConfig
}

export const getThinairConfigPath = () => {
    return path.join(os.homedir(), '.thinair', 'config')
}