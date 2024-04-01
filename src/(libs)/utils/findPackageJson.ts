import path from "path"
import { PackageJson } from "../../(types)/PackageJson.js"
import fs from "fs"


export type FindPackageJsonResult = {
    packageJsonObj: PackageJson;
    packageJsonPath: string;
} | null

export const findPackageJson = (startingDirectory: string): FindPackageJsonResult => {
    const findPackageJson = (cd: string): FindPackageJsonResult => {
        try {
            const potentialPath = path.join(cd, 'package.json')
            fs.accessSync(potentialPath)
            return {
                packageJsonObj: JSON.parse(fs.readFileSync(potentialPath).toString()) as PackageJson,
                packageJsonPath: potentialPath
            }
        } catch (e) {
            // Error means file doesn't exist at potentialPath, move up
            const pd = path.dirname(cd);
            // Check if we've reached the root and can't go up any further
            if (pd === cd) {
                return null; // package.json not found
            }
            return findPackageJson(pd)
        }
    }
    return findPackageJson(startingDirectory)
}