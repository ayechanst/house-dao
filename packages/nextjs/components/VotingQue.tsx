import React, { useState } from 'react';
import { useScaffoldContractRead } from '~~/hooks/scaffold-eth';
import { useScaffoldContractWrite } from '~~/hooks/scaffold-eth';
import { Task } from './Task';

interface TaskObject {
  name: string;
  manager: string;
  taskForce: string[];
  status: number;
  index: number;
}

export const VotingQue = () => {
  const [vote, setVote] = useState(false);
  const { writeAsync } = useScaffoldContractWrite({
    contractName: 'YourContract',
    functionName: 'ballot',
    args: [vote],
    onBlockConfirmation: txnReceipt => {
      console.log('voted', txnReceipt.blockHash);
    },
  });

  const { data: votingTask } = useScaffoldContractRead({
    contractName: 'YourContract',
    functionName: 'votingTask',
  });

  const task: TaskObject | undefined =
    votingTask && 'name' in votingTask ? (votingTask as TaskObject) : undefined;

  function handleVote(vote: boolean) {
    setVote(vote);
    writeAsync();
  }

  // let displayTask = true;
  // if (task?.status !== 0) {
  //   displayTask = false;
  // }

  return (
    <>
      <div className="card max-w-screen bg-base-100 shadow-xl mt-5">
        <div className="card-body p-5">
          <h2 className="card-title">Vote on this!</h2>
          <div>
            {votingTask && task?.status === 0 && (
              <Task
                key={task?.index}
                taskName={task.name}
                taskManager={task.manager}
                taskForce={task.taskForce}
                taskStatus={task.status}
                taskIndex={task.index}
              />
            )}
            {!votingTask && <div>No tasks for voting atm!</div>}
          </div>
          <div className="flex items-stretch justify-around">
            <button
              onClick={() => handleVote(true)}
              className="btn btn-success"
            >
              Approve
            </button>
            <button onClick={() => handleVote(false)} className="btn btn-error">
              Disapprove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
