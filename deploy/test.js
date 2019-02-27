/* eslint-disable no-console */
const { runInBaseImage } = require('./lib/update_images');

const args = process.argv.slice(2);

if (args.length < 1) {
  console.log('please provide apps to test as "node test.js app1 app2"');
  return;
}

runInBaseImage(
  `/bin/sh -c "mysql -hdb -uactimo -pomitca actimo_test < etc/schema.sql && node deploy/lib/run_test.js ${args.join(' ').trim()}"`,
  'test_default'
);
