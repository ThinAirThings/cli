#!/usr/bin/env node
import { program } from '@commander-js/extra-typings';

import packageJson from '../package.json';
import { createConfigCommand } from './config/createConfigCommand.js';
import { createGithubCommand } from './github/createGithubCommand.js';
import chalk from 'chalk';
import path from 'path';
import os from 'os';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { Text, render } from 'ink';
import React from 'react';
import { CreateOrganization, useCreateOrganizationStore } from './config/create-organization/CreateOrganization.js';



const parts = packageJson.version.split('.').map(Number);
const version = `${parts[0]}.${parts[1]}.${parts[2]! + 1}`;
program
	.name('thinair')
	.version(version)
	// Add hooks
	.hook('preSubcommand', async (thisCommand, actionCommand) => {
		console.log(chalk.cyan(`🚀 Thinair CLI ${version}`))
		const thinairPath = path.join(os.homedir(), '.thinair')
		if (!existsSync(thinairPath)) {
			mkdirSync(thinairPath);
			const configPath = path.join(thinairPath, 'config')
			console.log(chalk.blue(`📁 No config file found. Writing config file to ${configPath}`))
			writeFileSync(configPath, JSON.stringify({
				organizations: {},
			}, null, 2))
			render(<>
				<Text>Looks like you have no organizations setup. Lets fix that!</Text>
				<CreateOrganization />
			</>)
			await new Promise<void>((resolve) => {
				useCreateOrganizationStore.subscribe((state) => {
					if (state.complete) resolve()
				})
			})
		}
	})
// Config Command
createConfigCommand(program)

// Github Command
createGithubCommand(program)

program.parse()
