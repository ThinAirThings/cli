import { Command, program } from "@commander-js/extra-typings"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import os from "os";
import { render, useApp, useInput } from "ink";
import React from "react";
import { CreateOrganization } from "./create-organization/CreateOrganization.js";
import { ListOrganizations } from "./list-organizations/ListOrganizations.js";
import { SelectOrganization } from "./select-organization/SelectOrganization.js";


export const createConfigCommand = (program: Command<[], {}>) => {
    const configCommand = new Command('config')
    // Add subcommands
    configCommand.addCommand(new Command('create-organization')
        .action(() => {
            render(<CreateOrganization />)
        })
    )
    configCommand.addCommand(new Command('list-organizations')
        .action(() => {
            // const config = JSON.parse(readFileSync(path.join(os.homedir(), '.thinair', 'config')).toString())
            render(<ListOrganizations />)
        })
    )
    configCommand.addCommand(new Command('select-organization')
        .action(() => {
            render(<SelectOrganization />)
        })
    )
    configCommand.addCommand(new Command('clear-config')
        .action(() => {
            writeFileSync(path.join(os.homedir(), '.thinair', 'config'), JSON.stringify({
                organizations: {},
            }, null, 2))
        })
    )
    // Add to program
    program.addCommand(configCommand)
}
