import { useEffect } from "react"
import { useCreateOrganizationStore } from "./CreateOrganization.js"
import React from "react"
import { readFileSync, writeFileSync } from "fs"
import path from "path"
import os from "os"
import { useApp } from "ink"
import chalk from "chalk"


export const WriteToConfig = () => {
    const organizationName = useCreateOrganizationStore((state) => state.organizationName)
    const githubToken = useCreateOrganizationStore((state) => state.githubToken)
    const app = useApp()

    useEffect(() => {
        const configPath = path.join(os.homedir(), '.thinair', 'config')
        const config = JSON.parse(readFileSync(configPath).toString())
        config.organizations[organizationName] = {
            githubToken
        }
        if (Object.keys(config.organizations).length === 1) {
            config['defaultOrganization'] = Object.keys(config.organizations)[0]
        }
        writeFileSync(path.join(os.homedir(), '.thinair', 'config'), JSON.stringify(config, null, 2))

        console.log(chalk.green(`
            🚀 Added ${organizationName} to ${configPath} with github token ${githubToken}
        `.trim()))
        useCreateOrganizationStore.setState((state) => {
            state.complete = true
        })
    }, [])
    return (
        <></>
    )
}