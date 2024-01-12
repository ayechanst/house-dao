//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract {

    struct MaybeTask {
        string name;
        bool approved;
    }


    mapping(string => bool) public members;
    uint256 public numOfMembers = 0;
    MaybeTask[] public que;

    function addMember(string memory name) public {
        members[name] = true;
        numOfMembers++;
    }

    function addTask(string memory name) public {
        MaybeTask memory newMaybeTask = MaybeTask(name, false);
        que.push(newMaybeTask);
    }

    function ballot() public view returns(MaybeTask memory) {
    uint256 lastIndex;
    if (que.length < 1) {
        lastIndex = 0;
    } else {
        lastIndex = que.length - 1;
    }
    return que[0];
    }

}
