// /* eslint-disable no-console */
// const { BASE_DIR, executeCommand } = require('./dev_methods');

// const MAIN_DIR = BASE_DIR;
// const UPLOADS_DIR = `${MAIN_DIR}/volumes/uploads`;
// const EXPORTS_DIR = `${MAIN_DIR}/volumes/exports`;

// const imageName = 'actimo/base:trusty-8';
// const volumes = `-v ${MAIN_DIR}:/opt/actimo/main -v ${UPLOADS_DIR}:/opt/actimo/uploads -v ${EXPORTS_DIR}:/opt/actimo/exports -v ${MAIN_DIR}/log:/var/log/actimo` 
// const workdir = `-w="/opt/actimo/main"`
// const flags = '--rm -h -it';

// function runInBaseImage(command, network = 'dev_default') {
//   console.log(`run in ${imageName}:`, command);
//   network = (network) ? (`--network ${network}`) : ('');
//   executeCommand(`docker run ${flags} ${network} ${volumes} ${workdir} ${imageName} ${command}`);
// }

// module.exports = { runInBaseImage };
