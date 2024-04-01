import { FC, useEffect, useState } from "react"
import { useNearestPackageJson } from "../../(hooks)/useNearestPackageJson.js"
import chalk from "chalk"
import _, { set } from "lodash"
import { exec, execSync } from "child_process"
import { Box, Text } from "ink"
import React from "react"
import Spinner from 'ink-spinner';
import { UpdateGit } from "./UpdateGitHook.js"
import { CreateGithubWorkflow } from "./CreateGithubWorkflow.js"




export const UpdatePackageJson: FC<{
    libraryPath: string
}> = ({
    libraryPath
}) => {
        const [packageJson, updatePackageJson] = useNearestPackageJson(libraryPath)
        const [installationState, setInstallationState] = useState<
            | 'idle'
            | 'installingDependencies'
            | 'initializingCommitizen'
            | 'installationComplete'
        >('idle')
        useEffect(() => {
            if (!packageJson) {
                console.log(chalk.red('No package.json found.'))
                return
            }
            updatePackageJson(draft => {
                if (draft === null) return
                _.set(draft, 'scripts', {
                    ...draft.scripts,
                    "prepublishOnly": "npm run build",
                    "commit": "npx cz"
                })
                _.set(draft, 'devDependencies', {
                    ...draft.devDependencies,
                    "@semantic-release/changelog": "^6.0.3",
                    "@semantic-release/git": "^10.0.1",
                    "@semantic-release/github": "^10.0.2",
                    "@semantic-release/npm": "^12.0.0",
                    "cz-conventional-changelog": "^3.3.0",
                    "semantic-release": "^23.0.6",
                })
                _.set(draft, 'release.branches', [
                    "main"
                ])
                _.set(draft, 'release.plugins', [
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
            if (installationState !== 'idle') return
            setInstallationState('installingDependencies')
            exec('npm install', (err, stdout, stderr) => {
                if (err) {
                    console.error(err)
                }
                console.log(stdout)
                console.log(chalk.magenta(`✅  Finished installing dependencies.`))
                setInstallationState('initializingCommitizen')
                exec('npx commitizen init cz-conventional-changelog --save-dev --save-exact', {
                    cwd: libraryPath
                }, (err, stdout, stderr) => {
                    if (err) {
                        console.error(err)
                    }
                    console.log(stdout)
                    console.log(chalk.green('✅  Finished setting up commitizen.'))
                    setInstallationState('installationComplete')
                })
            })
        }, [packageJson, installationState])
        return (<>
            {installationState === 'installingDependencies' && <Box>
                <Text color='green'><Spinner type='dots' /></Text>
                <Text> Installing Dependencies...</Text>
            </Box>}
            {installationState === 'initializingCommitizen' && <Box>
                <Text color='green'><Spinner type='dots' /></Text>
                <Text> Initializing Commitizen...</Text>
            </Box>}
            {installationState === 'installationComplete' && <>
                <UpdateGit libraryPath={libraryPath} />
                <CreateGithubWorkflow libraryPath={libraryPath} />
            </>}
        </>)
    }