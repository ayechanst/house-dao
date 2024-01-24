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

  const { writeAsync: cycleManager } = useScaffoldContractWrite({
    contractName: 'YourContract',
    functionName: 'cycleManager',
    args: [indexAsBigInt],
  });

  // const { writeAsync: writeComplete } = useScaffoldContractWrite({
  //   contractName: 'YourContract',
  //   functionName: 'completeTask',
  //   args: [indexAsBigInt],
  // });

  const { writeAsync: writeGrade } = useScaffoldContractWrite({
    contractName: 'YourContract',
    functionName: 'gradeTask',
    args: [indexAsBigInt, gradeAsBigInt],
  });

  // function handleComplete() {
  //   writeComplete();
  // }

  function handleSubmit() {
    writeGrade();
    cycleManager();
  }

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body p-5">
          <h2 className="card-title">{taskName}</h2>
          <p>Task Manager: {taskManager}</p>
          <p>{taskForce}</p>
          <div className="card-actions justify-center">
            {taskStatus !== 0 && (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="grade / 10"
                  onChange={e => setTaskGrade(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
                <button type="submit" className="btn btn-primary mt-5">
                  Grade
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
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
