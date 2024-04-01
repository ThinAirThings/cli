import { ProgramNode } from "./ProgramNode.js";
import { runProgram } from "./runProgram.js";
import React from "react";
import { Github } from "./test-program/Config/Config.js";


runProgram(
    <ProgramNode
        name="raizer"
        version="0.0.1"
    >
        <Github>
            <Github />
        </Github>
    </ProgramNode>
)