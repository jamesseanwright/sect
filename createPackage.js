const child_process = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const packageName = process.argv[2];

if (!packageName) {
    console.error('Package name not specified!');
    process.exit(1);
}

const targetPath = path.join('packages', packageName);

fs.copySync(
    'package-template',
    targetPath,
    {
        overwrite: false,
        errorOnExist: true,
    },
);

const packageInfoPath = `./packages/${packageName}/package.json`;
const packageInfo = require(packageInfoPath);

packageInfo.name = packageInfo.name.replace('package-template', packageName);
fs.writeFileSync(packageInfoPath, JSON.stringify(packageInfo, null, 2));
console.log(`Package created at ${targetPath}!`);
child_process.execSync('./node_modules/.bin/lerna bootstrap');
