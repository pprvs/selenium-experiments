const WorkerNodes = require('worker-nodes');
const { resolve } = require('path');

const LAUNCHPAD_URL = 'https://magiceden.io/launchpad/br1'
const PROFILES = [
 '/Users/pedro.piloto/Library/Application Support/Firefox/Profiles/xinf79ae.bot3',
]
const TABS_NUMBER = 12


const path = resolve(__dirname, './work.js')
const myModuleWorkerNodes = new WorkerNodes(path);

for (let [index, profile] of PROFILES.entries()) {
 myModuleWorkerNodes.call(
  index, LAUNCHPAD_URL, profile, TABS_NUMBER
 ).then(msg => console.log(msg));
}
