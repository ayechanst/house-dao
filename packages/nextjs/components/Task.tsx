import { useScaffoldContractWrite } from '~~/hooks/scaffold-eth';
import React, { useState } from 'react';

interface TaskProps {
  taskName: string;
  taskManager: string;
  taskForce: string[];
  taskStatus: number;
  taskIndex: number;
}

export const Task = ({
  taskName,
  taskManager,
  taskForce,
  taskStatus,
  taskIndex,
}: TaskProps) => {
  //
  // variables
  //
  const [taskGrade, setTaskGrade] = useState('');
  const gradeAsBigInt = BigInt(taskGrade);
  const indexAsBigInt = BigInt(taskIndex);
  //
  // task completion
  //
  const { writeAsync: writeComplete } = useScaffoldContractWrite({
    contractName: 'YourContract',
    functionName: 'completeTask',
    args: [indexAsBigInt],
    onBlockConfirmation: txnReceipt => {
      console.log('purchase logged', txnReceipt.blockHash);
    },
  });

  function handleComplete() {
    writeComplete();
  }
  //
  // task grading
  //
  const { writeAsync: writeGrade } = useScaffoldContractWrite({
    contractName: 'YourContract',
    functionName: 'gradeTask',
    args: [indexAsBigInt, gradeAsBigInt],
    onBlockConfirmation: txnReceipt => {
      console.log('purchase logged', txnReceipt.blockHash);
    },
  });

  function handleGrade() {
    writeGrade();
  }

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body p-5">
          <h2 className="card-title">{taskName}</h2>
          <p>{taskManager}</p>
          <p>{taskForce}</p>
          <div className="card-actions justify-center">
            {taskStatus == 1 && (
              <button onClick={handleComplete} className="btn btn-primary">
                Done
              </button>
            )}
            {taskStatus == 2 && (
              <form onSubmit={handleGrade}>
                <input
                  type="number"
                  placeholder="How is it out of 10?"
                  onChange={e => setTaskGrade(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
                <button type="submit" className="btn btn-primary">
                  Grade
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
