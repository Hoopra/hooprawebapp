const { runInBaseImage } = require('./lib/update_images');

const args = process.argv.slice(2);
runInBaseImage(`node ./deploy/lib/build_apps.js ${args.join(' ').trim()}`);
