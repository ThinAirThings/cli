import { CommandNode } from "../../CommandNode.js";
import React, { FC, ReactNode } from "react";


export const Config: FC<{
    children?: ReactNode
}> = ({
    children
}) => {
        return (
            <CommandNode
                name="config"
                commandDefinition={command => command
                    .option("-u, --username <username>", "Github username")
                    .option("-p, --password <password>", "Github password")
                    .action((options) => {
                        console.log("Github")
                        console.log(options)
                    })
                }
            >
            </CommandNode>
        )
    }