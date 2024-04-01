import React, { ReactNode, useEffect } from 'react';
import { Command } from '@commander-js/extra-typings';
import { ProgramContext, useProgram } from './ProgramNode.js';


export const CommandNode = ({
    name,
    commandDefinition,
    children
}: {
    name: string,
    commandDefinition: (command: Command) => Command,
    children?: ReactNode
}) => {
    const program = useProgram()
    const definedCommand = commandDefinition(new Command(name))
    program.addCommand(definedCommand)
    return (<>
        <ProgramContext.Provider value={definedCommand}>
            {children}
        </ProgramContext.Provider>
    </>)
}

