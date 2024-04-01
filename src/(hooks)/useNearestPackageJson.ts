import { useEffect, useMemo, useState } from "react";
import path from "path";
import fs, { writeFileSync } from "fs";
import { PackageJson } from "../(types)/PackageJson.js";
import { useImmer } from "use-immer";
import { FindPackageJsonResult, findPackageJson } from "../(libs)/utils/findPackageJson.js";
import { Package } from "@pulumi/aws/opensearch/index.js";



export const useNearestPackageJson = (startingPath: string) => {
    const packageJsonResult = useMemo(() => findPackageJson(startingPath), [startingPath])
    const [packageJson, updatePackageJson] = useImmer<PackageJson | null>(packageJsonResult?.packageJsonObj ?? null)
    useEffect(() => {
        if (!packageJsonResult) return
        writeFileSync(packageJsonResult.packageJsonPath, JSON.stringify(packageJson, null, 2))
    }, [packageJson])
    return [
        packageJson,
        updatePackageJson,
        packageJsonResult?.packageJsonPath ?? null
    ] as const
}