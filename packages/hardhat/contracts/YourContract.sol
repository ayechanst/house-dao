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
    }

    enum Status {
        UNACTIVE,
        ACTIVE,
        GRADING
    }

    mapping(string => bool) public members;
    mapping(string => uint256[]) public reputation;
    uint256 public numOfMembers = 0;
    Task[] public taskArray;
    uint256 runnerUp;
    //voting
    uint256 yes;
    uint256 no;
    // grading
    uint256 totalGrade;
    uint256 numOfGrades;

    function votingTask() public view returns(Task memory) {
        if (taskArray.length < 1) {
            return Task("no task",
                        new string[](0),
                        "no one",
                        Status.UNACTIVE);
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
                                   Status.UNACTIVE);
        taskArray.push(newTask);
    }

    function ballot(bool vote) public {
        if (vote) {
            yes++;
        } else {
            no++;
        }
        if ((yes + no) == numOfMembers && yes > numOfMembers / 2) {
                taskArray[runnerUp].status = Status.ACTIVE;
                yes = 0;
                no = 0;
                runnerUp++;
            } else {
                taskArray[runnerUp].status = Status.UNACTIVE;
            }
    }

    function completeTask(uint256 taskIndex) public {
        Task memory task = taskArray[taskIndex];
        task.status = Status.GRADING;
        taskArray[taskIndex] = task;
    }

    function gradeTask(uint256 taskIndex, uint256 grade) public {
        Task memory task = taskArray[taskIndex];
        string memory manager = task.manager;
        totalGrade += grade;
        numOfGrades++;
        if (numOfGrades == task.taskForce.length) {
            uint256 finalGrade = totalGrade / task.taskForce.length;
            reputation[manager].push(finalGrade);
            numOfGrades = 0;
            taskArray[taskIndex] = task;
        }
    }

    function cycleManager(uint256 taskIndex) public {
        Task memory task = taskArray[taskIndex];
        string memory manager = task.manager;
        string[] memory taskForce = task.taskForce;
        uint256 managerIndex;
        for (uint256 i = 0; i < taskForce.length; i++) {
            if (keccak256(abi.encodePacked(taskForce[i])) ==
                keccak256(abi.encodePacked(manager))) {
                managerIndex = i;
            }
        }
        managerIndex++;
        if (managerIndex > taskForce.length) {
            managerIndex = 0;
        }
        taskArray[taskIndex] = task;
    }

    function getReputation(string memory name) public view returns(uint256 memberReputation) {
        uint256 tasksCompleted = reputation[name].length;
        uint256[] memory repArray = reputation[name];
        uint256 sum;
        uint256 average = sum / tasksCompleted;
        for (uint256 i = 0; i < repArray.length; i++) {
                sum += repArray[i];
            }
        return average;
    }

    // function executeTask(string memory memberName, uint256 grade) public {
    //     // task info
    //     uint256 targetTask; // the index
    //     Task memory current = taskArray[targetTask]; // the task
    //     Status taskStatus = current.status; // the task status
    //     // task manager
    //     uint256 targetManager;
    //     string memory manager = current.manager; // the task manager
    //     // task force
    //     string[] memory taskForce = current.taskForce; // the task force
    //     // grading
    //     uint256 totalGrade;
    //     uint256 finalGrade = totalGrade / current.taskForce.length;
    //     uint256 numOfGrades;
    //     // checks if manager called
    //     bool isManager;
    //     if (keccak256(abi.encodePacked(memberName)) ==
    //         keccak256(abi.encodePacked(manager))) {
    //         isManager = true;
    //     } else {
    //         isManager = false;
    //     }

    //     if (taskStatus == Status.ACTIVE) {
    //         if (isManager) {
    //             taskStatus = Status.GRADING;
    //         }
    //     } else if (taskStatus == Status.GRADING) {
    //         taskArray[targetTask] = current;
    //         if (!isManager) {
    //             totalGrade += grade;
    //             numOfGrades++;
    //             if (numOfGrades == current.taskForce.length) {
    //                 numOfGrades = 0;
    //                 reputation[manager].push(finalGrade);
    //                 targetManager++;
    //                 current.manager = taskForce[targetManager];
    //                 targetTask++;
    //                 taskStatus = Status.ACTIVE;
    //             }
    //         }
    //     } else {
    //         targetTask++;
    //     }
    //     // this updates the task array with the new completed task, do we need this?
    //     // yes because it needs to remember the new manager
    //     taskArray[targetTask] = current;
    // }

}
