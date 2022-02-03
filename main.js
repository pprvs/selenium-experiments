const WorkerNodes = require('worker-nodes');
const { resolve } = require('path');

const LAUNCHPAD_URL = 'https://www.magiceden.io/launchpad/message_party'
const PROFILES = [
    '/Users/prvs/Library/Application Support/Google/Chrome/Default'
]
const TABS_NUMBER = 20


const path = resolve(__dirname, './work.js')
const myModuleWorkerNodes = new WorkerNodes(path);

for (let [index, profile] of PROFILES.entries()) {
 myModuleWorkerNodes.call(
  index, LAUNCHPAD_URL, profile, TABS_NUMBER
 ).then(msg => console.log(msg));
}
