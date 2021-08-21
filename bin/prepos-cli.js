#!/user/bin/env node

import { program } from 'commander'
import package from '../package'

program
    .option('--init', 'helps to init your app')
    .version(package.version)
    .on('--help', () => {
        console.log('For initial project setup run "prepos-cli --init"');
    })
    .parse()
