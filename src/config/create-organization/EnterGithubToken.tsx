import { Box, Text, useInput, useStdout } from "ink"
import { useCreateOrganizationStore } from "./CreateOrganization.js"
import React from "react"
import TextInput from "ink-text-input"

export const EnterGithubToken = () => {
    const githubToken = useCreateOrganizationStore((state) => state.githubToken)

    return (
        <Box>
            <Text color="green">💻 Enter your github token: </Text>
            <TextInput
                value={githubToken}
                onChange={(value) => {
                    useCreateOrganizationStore.setState((state) => {
                        state.githubToken = value
                    })
                }}
                onSubmit={() => {
                    useCreateOrganizationStore.setState((state) => {
                        state.step += 1
                    })
                }}
            />
        </Box>
    )
}