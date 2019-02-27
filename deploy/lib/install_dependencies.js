// /* eslint-disable brace-style */
// /* eslint-disable no-console */
// const { BASE_DIR, deleteFile, executeCommand } = require('./dev_methods');

// console.log('npm install');
// executeCommand('npm install --unsafe-perm', `${BASE_DIR}/api`);
// executeCommand('npm install --unsafe-perm', `${BASE_DIR}/workers`);
// executeCommand('npm install --unsafe-perm', `${BASE_DIR}/lib`);
// executeCommand('npm install --unsafe-perm', `${BASE_DIR}/ui`);

// console.log('yarn install');
// // delete package-lock.json if exists - may break yarn install
// deleteFile(`${BASE_DIR}/frontend/apps/viewer/package-lock.json`);

// executeCommand('yarn install', `${BASE_DIR}/frontend`);
// executeCommand('grunt build-icons', `${BASE_DIR}/ui`);

// console.log('link actimo-lib');
// executeCommand(`ln -sf ${BASE_DIR}/lib ${BASE_DIR}/api/node_modules/actimo-lib`);
// executeCommand(`ln -sf ${BASE_DIR}/lib ${BASE_DIR}/workers/node_modules/actimo-lib`);
