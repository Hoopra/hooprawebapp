/* eslint-disable brace-style */
/* eslint-disable no-console */
const { execSync } = require('child_process');
const fs = require('fs');

// set base directory
process.chdir(`${__dirname}/../..`);
const BASE_DIR = process.cwd();

let BASE_DIR_POSIX = BASE_DIR.replace(/\\/g, '/')
if (BASE_DIR_POSIX.indexOf(':')) {
  const c = BASE_DIR_POSIX.split(':');
  BASE_DIR_POSIX = `//${c[0].toLowerCase()}${c[1]}` 
}

process.env.BASE_DIR = BASE_DIR;
process.env.BASE_DIR_POSIX = BASE_DIR_POSIX;

function copyFile(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.copyFileSync(source, destination);
  }
}

function executeCommand(command, directory = null) {
  if (directory) {
    console.log(`executing '${command}' in ${directory}`);
    process.chdir(directory);
    execute(command);
    process.chdir(`${BASE_DIR}`);
  }
  else {
    console.log(`executing '${command}'`);
    execute(command);
  }
}

function execute(command) {
  execSync(command, { stdio: 'inherit' });
}

function createDirectory(name) {
  if (!fs.existsSync(name)) {
    fs.mkdirSync(name);
  }
}

function deleteFile(path) {
  if (fs.existsSync(path)) {
    fs.unlink(path);
  }
}

function getArguments(process) {
  const args = process.argv.slice(2);
  const splitArgs = [];
  args.forEach((e) => {
    if (e.includes('=')) {
      splitArgs.push(...e.split('='));
    } else {
      splitArgs.push(e);
    }
  });
  if (splitArgs.length % 2 !== 0) {
    throw new Error('Invalid arguments');
  }
  const mapped = {};
  let currentKey = null;
  splitArgs.forEach((e) => {
    if (currentKey) {
      mapped[currentKey] = e;
      currentKey = null;
    } else {
      currentKey = e.replace(/-/g, '');
    }
  });
  return mapped;
}

module.exports = { BASE_DIR, createDirectory, deleteFile, executeCommand, copyFile, getArguments };
