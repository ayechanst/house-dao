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

    function votingTask() public view returns(MaybeTask memory) {
        if (que.length < 1) {
            return MaybeTask("no task", false);
        } else {
            return que[0];
        }
    }

    function addMember(string memory name) public {
        members[name] = true;
        numOfMembers++;
    }

    function addTask(string memory name) public {
        MaybeTask memory newMaybeTask = MaybeTask(name, false);
        que.push(newMaybeTask);
    }

    function ballot(bool vote) public returns(uint256 numOfVotes) {
        uint256 yes;
        uint256 no;
        bool dumb;

        // voting
        if (vote) {
            yes++;
        } else {
            no++;
        }

        // handling
        if ((yes + no) == numOfMembers) {
            if (yes > numOfMembers / 2) {
                return yes + no;
            } else {
                dumb = false;
            }

            // move task to end of que for popping
            if (que.length > 0) {
                que[0] = que[que.length - 1];
                que.pop();
            }
        } else {
            return yes + no;
        }
    }

    // we need to add a view function to look at the votes going in

}
