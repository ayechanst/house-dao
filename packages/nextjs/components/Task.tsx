import React, { useEffect, useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface TaskProps {
  taskName: string;
  taskManager: string;
  taskForce: string[];
  taskStatus: number;
  taskIndex: bigint;
}

export const Task = ({ taskName, taskManager, taskForce, taskStatus, taskIndex }: TaskProps) => {
  const [taskGrade, setTaskGrade] = useState("");
  const gradeAsBigInt = taskGrade !== undefined ? BigInt(taskGrade) : BigInt(0);

  const { writeAsync: cycleManager } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "cycleManager",
    args: [taskIndex],
  });

  const { writeAsync: writeGrade } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "gradeTask",
    args: [taskIndex, gradeAsBigInt],
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    writeGrade();
  }

  return (
    <>
      <div className="card w-80 bg-base-100 shadow-xl my-2">
        <div className="card-body p-5">
          <div className="card-title">{taskName}</div>
          <div className="flex">
            <div className="font-bold mr-3">Task Manager:</div>
            <div>{taskManager}</div>
          </div>
          <div>
            <div className="font-bold">Task Force:</div>
            {taskForce.map(member => {
              return (
                <div>
                  <div>{member}</div>
                </div>
              );
            })}
          </div>
          <div className="card-actions justify-center">
            {taskStatus !== 0 && (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="grade"
                  onChange={e => setTaskGrade(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
                <button type="submit" className="btn btn-primary mt-5">
                  Submit Grade
                </button>
                <button className="btn ml-2" onClick={() => cycleManager()}>
                  Cycle Manager
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
