import { Command, Option } from "@commander-js/extra-typings";
import { render } from "ink";
import { PackageJson } from "./create-repo/components/PackageJson.js";
import React from "react";


export const createGithubCommand = (program: Command<[], {}>) =>
    program.addCommand(new Command('github')
        .addCommand(new Command('create-repo')
            .addOption(new Option('-n, --name <name>', 'The name of the repository')
                .makeOptionMandatory()
            )
            .addOption(new Option('-o, --organization <organization>', 'The organization to create the repository in')
                .makeOptionMandatory()
            )
            .action(async () => {
                render(<>
                    <PackageJson
                        packagePath="/home/aircraft/create/ThinAir/libs/thinair-cli/tmp"
                        organizationName="grantgraph"
                        packageName="automation-test-stack"
                    />
                </>)
            })
        )
    )