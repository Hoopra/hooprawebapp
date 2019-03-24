/* eslint-disable no-console */
const { BASE_DIR, createDirectory, executeCommand, getArguments } = require('./lib/dev_methods');

const args = getArguments(process);

process.env = {
  ...process.env,
  ENV: args.env || args.e || 'dev',
  POSTGRES_PASSWORD: 'hoophoop123!',
  POSTGRES_USER: 'hoopra',
  POSTGRES_DB: 'hoopra_dev',
}

console.log('create log directory if not present');
createDirectory(`${BASE_DIR}/log`);

// if (args.includes('build')) {
//   console.log('build dev stack');
//   executeCommand(`node ${BASE_DIR}/deploy/lib/build_dev_stack.js`);

//   console.log('reset git changes');
//   executeCommand(`git checkout frontend/libs/common-ui/src/assets/material-icons/`, BASE_DIR);
//   executeCommand(`
//         find . -name "package.json*" -not -path "*/node_modules*" | while read line; do
//             git checkout -- $line
//         done
//     `, BASE_DIR);
// }

console.log(`run ${process.env.ENV} stack`);
// executeCommand('docker-compose build', `${BASE_DIR}/deploy/dev`);
executeCommand('docker-compose up', `${BASE_DIR}/deploy/dev`);
