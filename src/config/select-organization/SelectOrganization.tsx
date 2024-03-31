import React, { useEffect } from "react"
import { ThinAirConfig, getThinairConfig, getThinairConfigPath } from "../../(libs)/utils/getThinairConfig.js"
import SelectInput from 'ink-select-input';
import { writeFileSync } from "fs";
import chalk from "chalk";


export const SelectOrganization = () => {
    const [config, setConfig] = React.useState<ThinAirConfig | null>(null)
    useEffect(() => {
        setConfig(getThinairConfig())
    }, [])
    return (<>
        {config && <SelectInput
            items={Object.keys(config?.organizations).map((organization) => {
                return {
                    label: organization,
                    value: organization
                }
            })}
            onSelect={(item) => {
                config.defaultOrganization = item.value
                writeFileSync(getThinairConfigPath(), JSON.stringify(config, null, 2))
                setConfig(null)
                console.log(chalk.bold.magenta(`\nSelected ${item.value} as default organization`))
            }}
        />}
    </>)
}