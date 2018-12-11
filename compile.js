const path = require('path');
const fs = require('fs');

const solc = require('solc');

//const filepath = path.resolve(__dirname,'contracts','HelloWorld.sol');
// 第四模块 1-11切换为Lottery.sol
const filepath = path.resolve(__dirname,'contracts','Lottery.sol');
//console.log(filepath);
const source = fs.readFileSync(filepath,"utf8");

//console.log(source);
//console.log(solc.compile(source,1));
//最核心的合约
//console.log(solc.compile(source,1).contracts[':HelloWorld']);
//通过module.exports = 让其他文件也能拿到这个合约
// module.exports = solc.compile(source,1).contracts[':HelloWorld'];
module.exports = solc.compile(source,1).contracts[':Lottery'];
