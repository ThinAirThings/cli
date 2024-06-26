import { useCallback, useEffect, useState } from "react"
import { getThinairConfig, getThinairConfigPath } from "../(libs)/utils/getThinairConfig.js"
import { writeFileSync } from "fs"
import { ThinairConfig } from "../(types)/ThinairConfig.js"
import { useImmer } from "@thinairthings/use-immer"


export const useThinairConfig = () => {
    const [config, updateConfig] = useImmer<ThinairConfig>(getThinairConfig())
    useEffect(() => {
        if (!config) return
        writeFileSync(getThinairConfigPath(), JSON.stringify(config, null, 2))
    }, [config])
    return [config, updateConfig] as const
}