import { useEffect, useState } from "react";
import path from "path";
import fs from "fs";
import { PackageJson } from "../types/PackageJson.js";



export const useNearestPackageJson = () => {
    const [packageJson, setPackageJson] = useState<PackageJson | null>(null)
    useEffect(() => {
        if (packageJson) return
        const findPackageJson = (cd: string): PackageJson | null => {
            try {
                const potentialPath = path.join(cd, 'package.json')
                fs.accessSync(potentialPath)
                return JSON.parse(fs.readFileSync(potentialPath).toString()) as PackageJson
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
        const pkg = findPackageJson(__dirname)
        setPackageJson(pkg)
    }, [packageJson])
    return packageJson
}