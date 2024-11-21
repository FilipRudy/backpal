import fs from 'fs';
import { runCLI } from '@jest/core';
import * as path from 'path';
import { execSync } from 'child_process';

export const handler = async (event) => {
    try {

        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        console.log('Event body:', event);

        const tmpDir = '/tmp/';
        const lambdaTaskRoot = process.env.LAMBDA_TASK_ROOT || '/var/task'; 
        const entityFile = path.join(tmpDir, 'user.entity.ts');
        const testFile = 'entity.test.ts'
        const configFile = 'jest.config.js'


        fs.writeFileSync(entityFile, body.userCode, { flag: 'w' });
        console.log(`User code saved to: ${entityFile}`);

        if (!fs.existsSync('/tmp/node_modules')) {
            execSync(`cp -r ${lambdaTaskRoot}/node_modules /tmp/`);
        }

        const jestConfig = {
            config: configFile,
            _: [testFile],
            $0: ""
        };

        const { results } = await runCLI(jestConfig, ['']);

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: results.success,
                numPassedTests: results.numPassedTests,
                numFailedTests: results.numFailedTests,
                testResults: results.testResults,
            }),
        };

    } catch (error) {
        console.error('Error running Jest test', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
