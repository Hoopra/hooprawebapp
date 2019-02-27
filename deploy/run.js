/* eslint-disable no-console */
const { BASE_DIR, createDirectory, executeCommand } = require('./lib/dev_methods');

const args = process.argv.slice(2);

console.log(args);

// console.log('create log directory if not present');
// createDirectory(`${BASE_DIR}/log`);

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

// console.log('run dev stack');
executeCommand('docker-compose build', `${BASE_DIR}/deploy/dev`);
executeCommand('docker-compose up', `${BASE_DIR}/deploy/dev`);
