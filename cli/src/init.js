const fs = require('fs');
const path = require('path')
const childProcess = require('child_process')
const packagePath = path.resolve('package.json')
const tsConfigPath = path.resolve('tsconfig.json');

const init = () => {
    const dependencies = [
        '@khwar1/dev-server',
        'react@17.0.2',
        'react-dom@17.0.2',
        'typescript',
        'ts-loader'
    ]
    const devDeps = [
        '@types/react',
        '@types/react-dom'
    ]
    childProcess
        .execSync(
            `npm install --save ${dependencies.join(' ')}`,
            { stdio: 'inherit' }
        )
    childProcess
        .execSync(
            `npm install --save-dev ${devDeps.join(' ')} @khwar1/dev-server`,
            { stdio: 'inherit' }
        )

    const package = require(packagePath)
    package.scripts = package.scripts || {}
    package.scripts.khwar1_help = 'npx khwar1-cli --help';
    package.scripts.khwar1_init = 'npx khwar1-cli --init';
    package.scripts.start = 'khwar1-cli --server';
    package.scripts.build = 'khwar1-cli --build';
    package.scripts.prod = 'khwar1-cli --prod';

    if (!fs.existsSync(tsConfigPath)) {
        const config = {
            "compilerOptions": {
                "target": "es6",
                "module": "esnext",
                "lib": ["DOM", "ES2021"],
                "jsx": "react",
                "strict": true,
                "noImplicitAny": false,
                "esModuleInterop": true,
                "skipLibCheck": true,
                "forceConsistentCasingInFileNames": true,
                "moduleResolution": "node",
            },
            "exclude": [
                "node_modules",
                "**/*.test.ts",
                "**/*.test.tsx",
                "node_modules/@types/jest"
            ]
        }
        fs.writeFileSync(tsConfigPath, JSON.stringify(config, null, 4))
    }
    fs.writeFileSync(packagePath, JSON.stringify(package, null, 4) + '\n')
}

module.exports = init;
