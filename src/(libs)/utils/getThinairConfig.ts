import { readFileSync } from "fs"
import path from "path"
import os from "os"
import { ThinairConfig } from "../../(types)/ThinairConfig.js"




export const getThinairConfig = () => {
    return JSON.parse(readFileSync(path.join(os.homedir(), '.thinair', 'config')).toString()) as ThinairConfig
}

export const getThinairConfigPath = () => {
    return path.join(os.homedir(), '.thinair', 'config')
}