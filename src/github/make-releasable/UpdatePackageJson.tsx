import { FC, useEffect, useTransition } from "react"
import { useNearestPackageJson } from "../../(hooks)/useNearestPackageJson.js"
import chalk from "chalk"
import { set } from "lodash"
import { execSync } from "child_process"
import { Box, Text } from "ink"
import React from "react"
import Spinner from 'ink-spinner';


export const UpdatePackageJson: FC<{
    libraryPath: string
}> = ({
    libraryPath
}) => {
        const [packageJson, updatePackageJson] = useNearestPackageJson(libraryPath)
        const [isInstalling, startInstalling] = useTransition()
        useEffect(() => {
            if (!packageJson) {
                console.log(chalk.red('No package.json found.'))
                return
            }
            updatePackageJson(draft => {
                if (draft === null) return
                set(draft, 'scripts.commit', 'npx cz')
                set(draft, 'devDependencies', {
                    ...draft.devDependencies,
                    "@semantic-release/changelog": "^6.0.3",
                    "@semantic-release/git": "^10.0.1",
                    "@semantic-release/github": "^10.0.2",
                    "@semantic-release/npm": "^12.0.0",
                    "cz-conventional-changelog": "^3.3.0",
                    "semantic-release": "^23.0.6",
                })
                set(draft, 'release.branches', [
                    "main"
                ])
                set(draft, 'release.plugins', [
                    "@semantic-release/commit-analyzer",
                    "@semantic-release/release-notes-generator",
                    "@semantic-release/changelog",
                    "@semantic-release/npm",
                    "@semantic-release/git"
                ])
            })
        }, [])
        useEffect(() => {
            if (!packageJson) return
            startInstalling(() => {
                execSync('npm install')
            })
        }, [packageJson])
        return (<>
            {isInstalling && <Box>
                <Text color='green'><Spinner type='dots' /></Text>
                <Text> Installing Dependencies...</Text>
            </Box>}
        </>)
    }