// /* eslint-disable no-console */
// const { BASE_DIR, executeCommand, copyFile } = require('./dev_methods');
// const { runInBaseImage } = require('./update_images');

// console.log('update git configuration');
// executeCommand('git config --global core.autocrlf true');
// executeCommand('git config --global core.eol lf');

// console.log('updating submodules... you may be required to input credentials');
// executeCommand('git submodule init', './');
// executeCommand('git submodule update', './');

// console.log('verify config files');
// copyFile(`${BASE_DIR}/etc/conf.development.js.example`, `${BASE_DIR}/etc/conf.development.js`);
// copyFile(`${BASE_DIR}/workers/etc/conf.example.js`, `${BASE_DIR}/workers/etc/conf.development.js`);

// console.log('create docker base image');
// executeCommand('make', './etc/docker/base/');

// console.log('build docker images');
// executeCommand('docker-compose build', './etc/docker/dev/');

// console.log('update base image');
// runInBaseImage('node ./deploy/lib/install_dependencies.js');
// runInBaseImage('node ./deploy/lib/build_apps.js admin viewer ui');
