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

    struct Task {
        string name;
        string[] assignedMembers;
        bool approved;
    }

    mapping(string => bool) public members;
    uint256 public numOfMembers = 0;
    Task[] public taskArray;
    uint256 runnerUp;
    uint256 yes;
    uint256 no;

    function votingTask() public view returns(Task memory) {
        if (taskArray.length < 1) {
            return Task("no task",
                        new string[](0),
                        false);
        } else {
            return taskArray[runnerUp];
        }
    }

    function addMember(string memory name) public {
        members[name] = true;
        numOfMembers++;
    }

    function addTask(string memory name, string[] memory assignedMembers) public {
        Task memory newTask = Task(name,
                                   assignedMembers,
                                   false);
        taskArray.push(newTask);
    }

    function ballot(bool vote) public {
        if (vote) {
            yes++;
        } else {
            no++;
        }
        if ((yes + no) == numOfMembers) {
            if (yes > numOfMembers / 2) {
                taskArray[runnerUp].approved = true;
            } else {
                taskArray[runnerUp].approved = false;
            }
            runnerUp++;
            yes = 0;
            no = 0;
        } else {
            return;
        }
    }



}
