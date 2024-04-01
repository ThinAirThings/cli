import { program } from "@commander-js/extra-typings";
import { ReactNode } from "react";
import React from "react";
import { act, render as nilRender } from 'react-nil'

// @ts-ignore
global.IS_REACT_ACT_ENVIRONMENT = true
const ProgramBuilt = React.createContext<typeof program>(program)
export const runProgram = async (children: ReactNode) => {
    let endProgram: () => void
    const isComplete = new Promise<void>(resolve => { endProgram = resolve })
    const container = await act(async () => nilRender(<>
        {children}
    </>))
    console.log(container)
    program.parse()
    console.log("Below parse")
    await isComplete
}
