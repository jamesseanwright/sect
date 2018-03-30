const fs = require('fs-extra');
const path = require('path');

const packageName = process.argv[2];

if (!packageName) {
    console.error('Package name not specified!');
    process.exit(1);
}

fs.copySync(
    'package-template',
    path.join('packages', packageName),
    {
        overwrite: false,
        errorOnExist: true,
    },
);

const packageInfoPath = `./packages/${packageName}/package.json`;
const packageInfo = require(packageInfoPath);

packageInfo.name = packageInfo.name.replace('package-template', packageName);
fs.writeFileSync(packageInfoPath, JSON.stringify(packageInfo, null, 2));
