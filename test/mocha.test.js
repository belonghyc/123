
const assert = require('assert');
//  "test": "echo \"Error: no test specified\" && exit 1"
//编译是用 npm test 而不是node mocha.test.js
class person{
   eat(){
    return "eat";
  }

  walk(){
    return 'walk';
  }
}
var me;

beforeEach(()=>{
   me = new person();
})

describe('person',()=>{
  // it('can eat',()=>{
  //  // var me = new person();
  //   assert.equal(me.eat(),'eat')
  // })
  // it('can walk',()=>{
  //  // var me = new person();
  //   assert.equal(me.walk(),'walk')
  // })
});
//这个是里面有依赖包需要从git那边拉过来,而你没有在本地安装git，
//方法1：使用 npm install -g git 全局装上git. 方法2：到github下载客户端然后用git bash运行 npm install.
//把git放在环境变量里吧。Windows下的话可以在https://git-scm.com/downloads下下载，安装后把安装目录下的bin放在环境变量里就ok了。
