
import { writeFileSync } from 'fs';
import { Text } from 'ink';
import path from 'path';
import React, { FC, useEffect, useTransition } from 'react';

export const PackageJson: FC<{
    packagePath: string
    organizationName: string
    packageName: string
}> = ({
    packagePath,
    organizationName,
    packageName
}) => {
        const [isPending, startTransition] = useTransition();
        useEffect(() => {
            startTransition(() => {
                writeFileSync(path.join(packagePath, 'package.json'), JSON.stringify({
                    "name": `@${organizationName}/${packageName}`,
                    "version": "0.1.0",
                    "main": "dist/index.js",
                    "types": "dist/index.d.ts",
                    "scripts": {
                        "build": "tsup",
                        "npmpub": "npm run build && git add . && git commit -m \"mod\" && git push && npm version patch && npm publish --access public",
                        "format": "npx prettier --write ."
                    },
                    "files": [
                        "dist"
                    ],
                    "repository": {
                        "type": "git",
                        "url": `git+https://github.com/${organizationName}/${packageName}.git`
                    },
                    "devDependencies": {
                        "@types/aws-lambda": "^8.10.134",
                        "@types/node": "20.6.3",
                        "tsup": "^7.2.0",
                        "typescript": "~5.2.2"
                    },
                    "peerDependencies": {
                        "@pulumi/aws": "^6.0.0",
                        "@pulumi/pulumi": "^3.103.1"
                    },
                    "dependencies": {}
                }, null, 2))
            })
        }, [])
        return (
            <Text>Writing package.json...</Text>
        )
    }