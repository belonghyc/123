//const ganache = require('ganache-cli');
const ganache = require('ganache-cli');
const Web3  =require('web3');

const web3 = new Web3(ganache.provider());


// const helloworld = require('../compile');    //可以通过helloworld.bytecode获取bytecode属性 v.interface
//js新特性
const {bytecode,interface} = require('../compile');
//返回对象都话assert就会有值
const assert = require('assert');
//beforeEach里面都变量需要在外面定义
var helloworld;
beforeEach( async()=>{  //async和await连用
    fetchAccounts =await web3.eth.getAccounts();
    //arguments:['hyc'] 这话是作为传参
    helloworld =await new web3.eth.Contract(JSON.parse(interface)).deploy({data:bytecode,arguments:['hyc']}).send({from:fetchAccounts[0],gas:'1000000'});
  // web3.eth.getAccounts().then(fetchAccounts=>{
  //   console.log(fetchAccounts);
  // });
  //promise 对象作为返回
});

describe('HelloWorld',()=>{

  it('deploy contract',()=>{

    // console.log(helloworld);
    assert.ok(helloworld.options.address);
  })
//静态方法
  it('call static function',async()=>{  //调用区块链的代码一定是异步函数  web3的函数大部分都是异步的

    const message = await helloworld.methods.getName().call();//不需要消耗gas的静态方法可以用call调用

    assert.equal('hyc',message);
  })

  //动态函数
  it('call dynamic function',async ()=>{
    await helloworld.methods.changeName('jeason').send({from:fetchAccounts[0]}); //需要制定对象转账
    const message = await helloworld.methods.getName().call();
    assert.equal('jeason',message);
  })
})
