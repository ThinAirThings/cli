import { Box, Text, useInput } from "ink"
import { useCreateOrganizationStore } from "./CreateOrganization.js"
import React from "react"
import TextInput from 'ink-text-input';
export const EnterOrganizationName = () => {
    const organization = useCreateOrganizationStore((state) => state.organizationName)
    return (
        <Box>
            <Text color="green">🏢 Enter your organization name: </Text>
            <TextInput
                value={organization}
                onChange={(value) => {
                    useCreateOrganizationStore.setState((state) => {
                        state.organizationName = value
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