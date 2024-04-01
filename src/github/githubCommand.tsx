import { Command, Option } from "@commander-js/extra-typings";
import { render } from "ink";
import { PackageJson } from "./create-repo/components/PackageJson.js";
import React from "react";
import { MakeReleaseable } from "./make-releasable/MakeReleasable.js";


export const githubCommand = (program: Command<[], {}>) => {
    const githubCommand = new Command('github')
    githubCommand.addCommand(new Command('github')
        .addCommand(new Command('make-releasable')
            .argument('<libraryPath>', "The path to the library to make releasable")
            .action(async (libraryPath) => {
                render(<>
                    <MakeReleaseable libraryPath={libraryPath} />
                </>)
            })
        )
    )
    program.addCommand(githubCommand)
}