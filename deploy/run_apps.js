/* eslint-disable no-console */
const { runInBaseImage } = require('./lib/update_images');

const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('please provide apps to run after the command');
  return;
}

runInBaseImage(`node ./deploy/lib/run_apps_interactive.js ${args.join(' ').trim()}`, '');
