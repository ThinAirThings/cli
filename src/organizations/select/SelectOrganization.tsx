import React, { useState } from "react"
import SelectInput from 'ink-select-input';
import chalk from "chalk";
import { useThinairConfig } from "../../(hooks)/useThinairConfig.js";


export const SelectOrganization = () => {
    const [thinairConfig, updateThinairConfig] = useThinairConfig()
    const [complete, setComplete] = useState(false)
    return (<>
        {(!complete) && <SelectInput
            items={Object.keys(thinairConfig.organizations).map((organization) => {
                return {
                    label: organization,
                    value: organization
                }
            })}
            onSelect={(item) => {
                updateThinairConfig((draft) => {
                    draft.defaultOrganization = item.value
                })
                setComplete(true)
                console.log(chalk.bold.magenta(`\nSelected ${item.value} as default organization`))
            }}
        />}
    </>)
}