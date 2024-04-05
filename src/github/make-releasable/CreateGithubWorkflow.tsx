import path from "path";
import React, { FC, useEffect } from "react";
import fs from "fs";
import chalk from "chalk";

export const CreateGithubWorkflow: FC<{
  libraryPath: string;
  publishToNpm: boolean;
}> = ({ libraryPath, publishToNpm }) => {
  useEffect(() => {
    const workflowPath = path.join(libraryPath, ".github", "workflows", "release.yml");
    fs.mkdirSync(path.dirname(workflowPath), { recursive: true });
    fs.writeFileSync(
      workflowPath,
      /* yaml */ `
name: Release
on:
  push:
    branches:
      - main
      - next
      - beta

permissions:
  contents: read # for checkout

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    permissions:
      contents: write # to be able to publish a GitHub release
      issues: write # to be able to comment on released issues
      pull-requests: write # to be able to comment on released pull requests
      id-token: write # to enable use of OIDC for npm provenance
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Install dependencies
        run: npm clean-install
      - name: Release
        env:
          GITHUB_TOKEN: $\{{ secrets.GITHUB_TOKEN }}
          ${publishToNpm ? `NPM_TOKEN: $\{{ secrets.NPM_TOKEN }}` : ''}
        run: npx semantic-release
`.trim()
    );
    console.log(chalk.green("🚀  Created .github/workflows/release.yml"))
  }, []);

  return <></>;
};
