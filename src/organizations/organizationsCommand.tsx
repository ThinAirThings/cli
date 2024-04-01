import { Command, program } from "@commander-js/extra-typings"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import os from "os";
import { render } from "ink";
import React from "react";
import { CreateOrganization } from "./create/CreateOrganization.js";
import { ListOrganizations } from "./list/ListOrganizations.js";
import { SelectOrganization } from "./select/SelectOrganization.js";
import { UpdateOrganization } from "./update/UpdateOrganization.js";


export const organizationsCommand = (program: Command<[], {}>) => {
    const command = new Command('organizations')
    // Add subcommands
    command.addCommand(new Command('create')
        .action(() => {
            render(<CreateOrganization />)
        })
    )
    command.addCommand(new Command('list')
        .action(() => {
            render(<ListOrganizations />)
        })
    )
    command.addCommand(new Command('update')
        .action(() => {
            render(<UpdateOrganization />)
        })
    )
    command.addCommand(new Command('select')
        .action(() => {
            render(<SelectOrganization />)
        })
    )
    command.addCommand(new Command('clear-config')
        .action(() => {
            writeFileSync(path.join(os.homedir(), '.thinair', 'config'), JSON.stringify({
                organizations: {},
            }, null, 2))
        })
    )
    // Add to program
    program.addCommand(command)
}
