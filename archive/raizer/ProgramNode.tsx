import { program } from "@commander-js/extra-typings"
import React, { FC } from "react"


export const ProgramContext = React.createContext<typeof program>(program)
export const useProgram = () => React.useContext(ProgramContext)

export const ProgramNode: FC<{
    name: string,
    version: string
    children: React.ReactNode
}> = ({
    name,
    version,
    children
}) => {
        const program = useProgram()
        program
            .name(name)
            .version(version)
        return <ProgramContext.Provider value={program}>
            {children}
        </ProgramContext.Provider>
    }