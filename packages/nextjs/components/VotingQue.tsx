import React, { useState } from "react";
import { Task } from "./Task";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const VotingQue = () => {
  const [vote, setVote] = useState(false);

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "ballot",
    args: [vote],
    onBlockConfirmation: txnReceipt => {
      console.log("voted", txnReceipt.blockHash);
    },
  });

  const { data: votingTask } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "votingTask",
  });

  const task: any = votingTask;

  function handleVote(vote: boolean) {
    setVote(vote);
    writeAsync();
  }

  return (
    <>
      <div className="card max-w-screen bg-base-100 shadow-xl mt-5">
        <div className="card-body p-5">
          <h2 className="card-title">Vote on this!</h2>
          {task?.status == 0 && (
            <div>
              <Task
                key={task.index}
                taskName={task.name}
                taskManager={task.manager}
                taskForce={task.taskForce}
                taskStatus={task.status}
                taskIndex={task.index}
              />
              <div className="flex items-stretch justify-around">
                <button onClick={() => handleVote(true)} className="btn btn-success">
                  Approve
                </button>
                <button onClick={() => handleVote(false)} className="btn btn-error">
                  Disapprove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
