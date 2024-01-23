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
  const gradeAsBigInt = taskGrade !== undefined ? BigInt(taskGrade) : BigInt(0);
  const indexAsBigInt = taskIndex !== undefined ? BigInt(taskIndex) : BigInt(0);
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
  //
  // task cycle
  //
  const { writeAsync: cycleManager } = useScaffoldContractWrite({
    contractName: 'YourContract',
    functionName: 'cycleManager',
    args: [indexAsBigInt],
    onBlockConfirmation: txnReceipt => {
      console.log('purchase logged', txnReceipt.blockHash);
    },
  });

  function handleManager() {
    cycleManager();
  }

  return (
    <>
      {taskStatus == 1 && (
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body p-5">
            <h2 className="card-title">{taskName}</h2>
            <p>Task Manager: {taskManager}</p>
            <p>{taskForce}</p>
            <div className="card-actions justify-center">
              <button onClick={handleComplete} className="btn btn-primary">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      {taskStatus == 2 && (
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body p-5">
            <h2 className="card-title">{taskName}</h2>
            <p>Task Manager: {taskManager}</p>
            <p>{taskForce}</p>
            <div className="card-actions justify-center">
              <form>
                {' '}
                // TODO: cycle manager
                <input
                  type="text"
                  placeholder="grade / 10"
                  onChange={e => setTaskGrade(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
                <button onClick={handleGrade} className="btn btn-primary">
                  Grade
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/*       {taskStatus == 2 && ( */}
      {/*         <form onSubmit={handleGrade}> */}
      {/*           <input */}
      {/*             type="number" */}
      {/*             placeholder="How is it out of 10?" */}
      {/*             onChange={e => setTaskGrade(e.target.value)} */}
      {/*             className="input input-bordered w-full max-w-xs" */}
      {/*           /> */}
      {/*           <button type="submit" className="btn btn-primary"> */}
      {/*             Grade */}
      {/*           </button> */}
      {/*         </form> */}
      {/*       )} */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </div> */}
    </>
  );
};
