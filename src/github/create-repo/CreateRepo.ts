
import * as aws from "@pulumi/aws";
import * as github from "@pulumi/github";
import { LocalWorkspace } from "@pulumi/pulumi/automation/localWorkspace.js";

export const createRepo = async () => {
    const pulumiProgram = async () => {
        const siteBucket = new aws.s3.Bucket("dans-dummy-bucket1", {
            website: {
                indexDocument: "index.html",
            },
        });
        return {
            siteBucketUrl: siteBucket.websiteEndpoint,
        }
    }
    const stack = await LocalWorkspace.createOrSelectStack({
        stackName: "grantgraph/automation-test-stack",
        projectName: "grantgraph",
        program: pulumiProgram,
    })
    // await stack.workspace.installPlugin("aws", "v6.28.1")
    await stack.setConfig("aws:region", { value: "us-east-1" })
    const upRes = await stack.up({ onOutput: console.info, color: 'always' })
}