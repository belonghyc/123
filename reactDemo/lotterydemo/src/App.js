import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
class App extends Component {

state = {
  manager:'',
  players:[],
  balance:'',
  value:''
}

//react生命周期的函数
  async componentDidMount(){
    //第一次写的时候忘记了 await  下次需要注意
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    console.log(manager);
    this.setState({manager,players,balance});
  }
  onSubmit = async event =>{
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({message:'等待交易完成....'});
    //web3.utils.toWei()web3的转为为ether单位的工具
    await lottery.methods.enetr().send({from:accounts[0],value:web3.utils.toWei(this.state.value,'ether')});
    this.setState({message:'交易完成....'});
  }

  onClick = async ()=>{
    const accounts = await web3.eth.getAccounts();
    this.setState({message:'等待交易完成.....'});
    await lottery.methods.pickwiner().send({from:accounts[0]});
    this.setState({message:'赢家产生'});
  }

  render() {
  //  console.log(web3.version);
  console.log(this.state.value);
    return (
      <div>
        <h1>lottery管理者的地址：</h1>
        <p>this manager by {this.state.manager} </p>
        <p>当前参与者的数量：{this.state.players.length} </p>
        <p>当前资金池：{web3.utils.fromWei(this.state.balance,'ether')} </p>
        <hr/>
          // 添加form表单 为玩家入场添加按钮
        <form onSubmit={this.onSubmit}>
        <h4>参与到博彩项目？</h4>
          <div>
            <label>你想要参与的金额？</label>
            <input value={this.state.value}
              onChange ={event => {this.setState({value:event.target.value})}}
            />
          </div>
          <button>提交</button>
        </form>
        <hr/>
          <h4>判断输赢</h4>
          <button onClick={this.onClick}>开始博彩</button>

        <p>{this.state.message}</p>


      </div>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     hehe
      // <p>this manager by {this.state.manager} </p>
      //
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
    );
  }
}

export default App;
