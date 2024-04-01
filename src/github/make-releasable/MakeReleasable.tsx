import { FC } from "react";
import { UpdatePackageJson } from "./UpdatePackageJson.js";
import React from "react";


export const MakeReleaseable: FC<{
    libraryPath: string
}> = ({
    libraryPath
}) => {

        return (
            <UpdatePackageJson libraryPath={libraryPath} />
        )
    }