pragma solidity ^0.4.23;

contract Lottery{

  address public manager;

  address[] public players;

  constructor() public{
    manager = msg.sender;
  }

  function enetr() public payable{
    require(msg.value>0.01 ether);//入场必须有以太币
    players.push(msg.sender);
  }

  function random() private view returns (uint){
    //block.difficulty区块的困难度
    //以太坊内置的hash函数 keccak256 并且将随机数传进去
    return uint(keccak256(block.difficulty,now,players));
  }

  //pickwiner只能由管理者进行调用 需要进行优化
  modifier restricted(){
    require(msg.sender == manager);
    _;
  }

  function pickwiner() public{
    uint index = random() % players.length; // 取mod的操作保证这个index在玩家的数量之间

    //得到index 会给赢家传递一笔钱
    players[index].transfer(address(this).balance);
    //结束之后把玩家列表都清空
    players = new address[](0);
  }

  function getPlayers() public returns (address[]){
    return players;
  }

}
