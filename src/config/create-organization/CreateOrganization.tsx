import { Box, Text, useInput } from "ink"
import React, { FC } from "react"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer";
import { EnterOrganizationName } from "./EnterOrganizationName.js";
import { EnterGithubToken } from "./EnterGithubToken.js";
import { WriteToConfig } from "./WriteToConfig.js";



type CreateOrganizationStore = {
    organizationName: string
    githubToken: string
    step: number,
    complete: boolean
}

export const useCreateOrganizationStore = create<CreateOrganizationStore>()(
    immer(() => {
        return {
            organizationName: "",
            githubToken: "",
            step: 1,
            complete: false as boolean
        }
    })
)

export const CreateOrganization = () => {
    const step = useCreateOrganizationStore((state) => state.step)
    const complete = useCreateOrganizationStore((state) => state.complete)
    if (complete) {
        return <Text>🚀 Organization created!</Text>
    }
    return (<>
        {step === 1 && <EnterOrganizationName />}
        {step === 2 && <EnterGithubToken />}
        {step === 3 && <WriteToConfig />}
    </>)
}