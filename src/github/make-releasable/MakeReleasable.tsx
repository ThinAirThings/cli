import { FC, useState } from "react";
import { UpdatePackageJson } from "./UpdatePackageJson.js";
import React from "react";
import SelectInput from 'ink-select-input';
import { Text } from "ink";

export const MakeReleasable: FC<{
    libraryPath: string
}> = ({
    libraryPath
}) => {
        const [publishToNpm, setPublishToNpm] = useState<boolean | 'notSet'>('notSet')

        return (<>
            {publishToNpm === 'notSet' ? <>
                <Text>Do you want to build and publish this repo to NPM?</Text>
                <SelectInput
                    items={[{
                        label: 'Yes',
                        value: true
                    }, {
                        label: 'No',
                        value: false
                    }]}
                    onSelect={(item) => {
                        setPublishToNpm(item.value)
                    }}
                />
            </> : <UpdatePackageJson libraryPath={libraryPath} publishToNpm={publishToNpm} />}
        </>
        )
    }