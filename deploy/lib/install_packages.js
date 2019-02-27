// const { BASE_DIR, executeCommand } = require('./dev_methods');

// const args = process.argv.slice(2);
// let apps = [];
// let packages = [];

// if (args.includes('-p')) {
//   const flagIndex = args.indexOf('-p');
//   apps = args.slice(0, flagIndex);
//   packages = args.slice(flagIndex + 1);
// } else {
//   apps = args;
// }

// if (apps.length < 1) {
//   console.log('please input at least one app to install dependencies for');
//   return;
// } else if (apps.length > 1 && packages.length > 0) {
//   console.log('please install packages for only one app');
//   return;
// }

// const packageList = packages.join(' ').trim();

// if (args.includes('ui')) {
//   executeCommand(`npm install --unsafe-perm ${packageList}`, `${BASE_DIR}/ui`);
// }
// if (args.includes('frontend')) {
//   executeCommand(`yarn install ${packageList}`, `${BASE_DIR}/frontend`);
// }
// if (args.includes('api')) {
//   executeCommand(`npm install --unsafe-perm ${packageList}`, `${BASE_DIR}/api`);
// }
// if (args.includes('workers')) {
//   executeCommand(`npm install --unsafe-perm ${packageList}`, `${BASE_DIR}/workers`);
// }
// if (args.includes('lib')) {
//   executeCommand(`npm install --unsafe-perm ${packageList}`, `${BASE_DIR}/lib`);
// }
