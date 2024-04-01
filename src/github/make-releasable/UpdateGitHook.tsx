import path from "path"
import { FC, useEffect } from "react"
import React from "react"
import fs, { writeFileSync } from "fs"
import chalk from "chalk"

export const UpdateGit: FC<{
    libraryPath: string
}> = ({
    libraryPath
}) => {
        useEffect(() => {
            try {
                const potentialPath = path.join(libraryPath, '.git')
                fs.accessSync(potentialPath)
                console.log(chalk.green('🌲  Found .git folder.'))
                writeFileSync(path.join(potentialPath, 'hooks', 'prepare-commit-msg'), `
#!/bin/bash
exec < /dev/tty && node_modules/.bin/cz --hook || true
`.trim())
                fs.chmodSync(path.join(potentialPath, 'hooks', 'prepare-commit-msg'), '755')
                console.log(chalk.green('✅  Updated prepare-commit-msg hook.'))
            } catch (e) {
                // Error means file doesn't exist at potentialPath, move up
                console.log(chalk.red('No .git folder found. Create a git repo and try again.'))
            }
        }, [])
        return (
            <></>
        )
    }