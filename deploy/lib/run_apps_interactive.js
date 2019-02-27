// const { BASE_DIR, executeCommand } = require('./dev_methods');

// const args = process.argv.slice(2);
// let command = '';

// if (args.includes('ui')) {
//   addToCommand(`(cd ${BASE_DIR}/frontend; npm run build:ui)`);
// }
// if (args.includes('admin')) {
//   addToCommand(`(cd ${BASE_DIR}/frontend; npm run start:docker:admin)`);
// }
// if (args.includes('viewer')) {
//   addToCommand(`(cd ${BASE_DIR}/frontend; npm run start:docker:viewer)`);
// }
// // if (args.includes('workers')) {
// //   addToCommand(`(cd ${BASE_DIR}/workers; npm run dispatchd & npm run reminderd & npm run mediad & npm run statsd & npm run taskd & npm run recurringd & npm run emaild & npm run smsd & npm run integrationd)`);
// // }

// executeCommand(command, BASE_DIR);
// function addToCommand(add) {
//   command = command.trim();
//   if (command.length > 1) {
//     command += ' & ';
//   }
//   command += add;
// }