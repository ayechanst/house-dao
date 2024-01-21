const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        YourContract: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [
                {
                  internalType: "string",
                  name: "memberName",
                  type: "string",
                },
              ],
              name: "addMember",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "string[]",
                  name: "taskForce",
                  type: "string[]",
                },
              ],
              name: "addTask",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bool",
                  name: "vote",
                  type: "bool",
                },
              ],
              name: "ballot",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "taskIndex",
                  type: "uint256",
                },
              ],
              name: "completeTask",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "taskIndex",
                  type: "uint256",
                },
              ],
              name: "cycleManager",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getMembers",
              outputs: [
                {
                  internalType: "string[]",
                  name: "allMembers",
                  type: "string[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
              ],
              name: "getReputation",
              outputs: [
                {
                  internalType: "uint256",
                  name: "memberReputation",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getTasks",
              outputs: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                    {
                      internalType: "string[]",
                      name: "taskForce",
                      type: "string[]",
                    },
                    {
                      internalType: "string",
                      name: "manager",
                      type: "string",
                    },
                    {
                      internalType: "enum YourContract.Status",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "uint256",
                      name: "taskIndex",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct YourContract.Task[]",
                  name: "allTasks",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "taskIndex",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "grade",
                  type: "uint256",
                },
              ],
              name: "gradeTask",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "membersArray",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              name: "membersMapping",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "reputation",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "taskArray",
              outputs: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "manager",
                  type: "string",
                },
                {
                  internalType: "enum YourContract.Status",
                  name: "status",
                  type: "uint8",
                },
                {
                  internalType: "uint256",
                  name: "taskIndex",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "votingTask",
              outputs: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                    {
                      internalType: "string[]",
                      name: "taskForce",
                      type: "string[]",
                    },
                    {
                      internalType: "string",
                      name: "manager",
                      type: "string",
                    },
                    {
                      internalType: "enum YourContract.Status",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "uint256",
                      name: "taskIndex",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct YourContract.Task",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
