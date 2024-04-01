import { useImmer } from "use-immer"
import { useThinairConfig } from "../../(hooks)/useThinairConfig.js"
import React, { useEffect, useState } from "react"
import SelectInput from 'ink-select-input';
import TextInput from "ink-text-input";
import { ThinairConfig } from "../../(types)/ThinairConfig.js";
import { Box, Newline, Text } from "ink";
import chalk from "chalk";

export const UpdateOrganization = () => {
    const [thinairConfig, updateThinairConfig] = useThinairConfig()
    const [selectedOrganization, updateSelectedOrganization] = useState<keyof ThinairConfig['organizations'] | null>(null)
    const [githubToken, setGithubToken] = useState<string>("" as string)
    const [step, setStep] = useState(1)
    useEffect(() => {
        if (step === 3) {
            console.log(chalk.bold.magenta(`\nUpdated ${selectedOrganization} with new GitHub Token`))
        }
    }, [step])
    return (<>
        <Newline />
        {(step === 1) && <>
            <Text>{`⬆️   Select an organization to update it's GitHub Token`}</Text>
            <SelectInput
                items={Object.keys(thinairConfig.organizations).map((organization) => {
                    return {
                        label: organization,
                        value: organization
                    }
                })}
                onSelect={(item) => {
                    updateSelectedOrganization(item.value)
                    setStep(2)
                }}
            />
        </>}
        {(step === 2) && <Box>
            <Text color="green">💻 Enter your github token: </Text>
            <TextInput
                value={githubToken}
                onChange={(value) => {
                    setGithubToken(value)
                }}
                onSubmit={() => {
                    updateThinairConfig((draft) => {
                        draft.organizations[selectedOrganization!]!.githubToken = githubToken
                    })
                    setStep(3)
                }}
            />
        </Box>}
    </>)
}
