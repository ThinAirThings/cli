import React, { useEffect } from "react"
import { Table } from '@tqman/ink-table'
import { getThinairConfig } from "../../(libs)/utils/getThinairConfig.js"


export const ListOrganizations = () => {
    const [data, setData] = React.useState([] as any[])
    useEffect(() => {
        const config = getThinairConfig()
        const organizations = Object.keys(config.organizations).map((organization) => {
            return {
                organization,
                githubToken: config.organizations[organization]!.githubToken
            }
        })
        setData(organizations)
    }, [])
    return (
        <>{
            data.length > 0 && <Table data={data} />
        }</>
    )
}