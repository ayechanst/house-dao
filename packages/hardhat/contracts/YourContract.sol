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
        uint256 taskIndex;
    }

    enum Status {
        UNACTIVE,
        ACTIVE,
        GRADING
    }

    mapping(string => bool) public membersMapping;
    string[] public membersArray;
    mapping(string => uint256[]) public reputation;
    Task[] public taskArray;
    uint256 runnerUp;
    //voting
    uint256 yes;
    uint256 no;
    // grading
    uint256 totalGrade;
    uint256 numOfGrades;

    function votingTask() public view returns(Task memory) {
        // if array is empty
        if (taskArray.length < 1) {
            return Task("this is a blank task",
                        new string[](0),
                        "no one yet!",
                        Status.UNACTIVE,
                        0);
        } else if () { // the previous task was not voted for

        } else if () {

        } else {
            return taskArray[runnerUp];
        }
    }

    function addMember(string memory memberName) public {
        membersArray.push(memberName);
        membersMapping[memberName] = true;
    }

    function getMembers() public view returns(string[] memory allMembers) {
        allMembers = new string[](membersArray.length);
        for (uint256 i = 0; i < membersArray.length; i++) {
            allMembers[i] = membersArray[i];
        }
        return allMembers;
    }

    function addTask(string memory name, string[] memory taskForce) public {
        uint256 newTaskIndex = taskArray.length;
        Task memory newTask = Task(name,
                                   taskForce,
                                   taskForce[0],
                                   Status.UNACTIVE,
                                   newTaskIndex);
        taskArray.push(newTask);
    }

    function getTasks() public view returns(Task[] memory allTasks) {
        allTasks = new Task[](taskArray.length);
        for (uint256 i = 0; i < taskArray.length; i++) {
            if (taskArray[i].status == Status.ACTIVE) {
                allTasks[i] = taskArray[i];
            }
        }
            return allTasks;
    }

    function ballot(bool vote) public {
        if (vote) {
            yes++;
        } else {
            no++;
        }
        if ((yes + no) == membersArray.length && yes > membersArray.length / 2) {
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
        require(task.status == Status.ACTIVE, "Task is not active");
        task.status = Status.GRADING;
        taskArray[taskIndex] = task;
    }

    function gradeTask(uint256 taskIndex, uint256 grade) public {
        Task memory task = taskArray[taskIndex];
        require(task.status == Status.GRADING, "Task is not done yet");
        string memory manager = task.manager;
        totalGrade += grade;
        numOfGrades++;
        if (numOfGrades == task.taskForce.length) {
            uint256 finalGrade = totalGrade / task.taskForce.length;
            reputation[manager].push(finalGrade);
            numOfGrades = 0;
            task.status = Status.ACTIVE;
            taskArray[taskIndex] = task;
        }
    }

    function cycleManager(uint256 taskIndex) public {
        Task memory task = taskArray[taskIndex];
        require(task.status == Status.ACTIVE, "Task is not active");
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
        if (managerIndex >= taskForce.length) {
            managerIndex = 0;
        }
        taskArray[taskIndex] = task;
    }

    function getReputation(string memory name) public view returns(uint256 memberReputation) {
        uint256[] memory repArray = reputation[name];
        uint256 tasksCompleted = reputation[name].length;
        uint256 sumRep;
        for (uint256 i = 0; i < repArray.length; i++) {
                sumRep += repArray[i];
            }
        uint256 average = sumRep / tasksCompleted;
        return average;
    }

}
