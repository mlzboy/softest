#!/usr/bin/env node

const commander = require('commander');
const child_process = require('child_process');
const common = require('./utils/common');

const program = new commander.Command();

/**
 * Run softest.
 * 
 * @param {string} host - Server hostname (default: 127.0.0.1).
 * @param {number} port - Server port (default: 2333).
 * @param {string} chromium - The absolute path of the chromium execution file.
 * @param {string} savePath - Test report save path.
 */
function run(host, port, chromium, savePath) {
  // For proxy.js and web.js, their relative paths are for index.js.
  const cliProxy = child_process.spawn('node', ['./lib/proxy.js', '&']);
  common.captureLog(cliProxy);
  const cliRecoder = child_process.spawn('node', ['./lib/web.js', host, port, chromium, savePath]);
  common.captureLog(cliRecoder);

  console.log(`
 _______  _______  _______  _______  _______  _______  _______ 
|       ||       ||       ||       ||       ||       ||       |     status: running
|  _____||   _   ||    ___||_     _||    ___||  _____||_     _|     host: ${host}
| |_____ |  | |  ||   |___   |   |  |   |___ | |_____   |   |       port: ${port}
|_____  ||  |_|  ||    ___|  |   |  |    ___||_____  |  |   |  
 _____| ||       ||   |      |   |  |   |___  _____| |  |   |  
|_______||_______||___|      |___|  |_______||_______|  |___|  
`);
}

program
  .option('-h, --host <type>', 'Server hostname (default: 127.0.0.1).', '127.0.0.1')
  .option('-p, --port <type>', 'Server port (default: 2333).', 2333)
  .option('-c, --chromium <type>', 'The absolute path of the chromium execution file.')
  .option('-s, --save <type>', 'Test report save path.');

program.parse(process.argv);
run(program.host, program.port, program.chromium, program.save);