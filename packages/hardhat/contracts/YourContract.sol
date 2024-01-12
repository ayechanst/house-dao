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
        string[] taskForce;
        string manager;
        Status status;
        bool approved;
    }

    enum Status {
        ACTIVE,
        GRADING,
        EFFECT
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
                        "no one",
                        Status.ACTIVE,
                        false);
        } else {
            return taskArray[runnerUp];
        }
    }

    function addMember(string memory name) public {
        members[name] = true;
        numOfMembers++;
    }

    function addTask(string memory name, string[] memory taskForce) public {
        Task memory newTask = Task(name,
                                   taskForce,
                                   taskForce[0],
                                   Status.ACTIVE,
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

    function executeTask(string memory memberName, uint256 grade) public {
        // task info
        uint256 targetTask; // the index
        Task memory current = taskArray[targetTask]; // the task
        Status taskStatus = current.status; // the task status
        // task manager
        uint256 targetManager;
        string memory manager = current.manager; // the task manager
        // task force
        string[] memory taskForce = current.taskForce; // the task force

        if (taskStatus == Status.ACTIVE) {
            if (keccak256(abi.encodePacked(memberName)) ==
                keccak256(abi.encodePacked(manager))) {
                taskStatus = Status.EFFECT;
            }
        } else if (taskStatus == Status.GRADING) {
            taskStatus = Status.EFFECT;
            // if its not the manager grade
        } else if (taskStatus == Status.EFFECT) {
            taskStatus = Status.ACTIVE;
            // also set new manager
            targetManager++;
            current.manager = taskForce[targetManager];
            targetTask++;
        } else {
            // error
        }

        taskArray[targetTask] = current;

    }

}
