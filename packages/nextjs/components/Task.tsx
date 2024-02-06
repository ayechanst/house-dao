import React, { useEffect, useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface TaskProps {
  taskName: string;
  taskManager: string;
  taskForce: string[];
  taskStatus: number;
  taskIndex: number;
}

export const Task = ({ taskName, taskManager, taskForce, taskStatus, taskIndex }: TaskProps) => {
  // console.log('this thing is re-rendering');
  //
  // variables
  //
  const [taskGrade, setTaskGrade] = useState("");
  const gradeAsBigInt = taskGrade !== undefined ? BigInt(taskGrade) : BigInt(0);
  // it needs to reload the task index so it doesnt always think its the first one
  // this might be a large scale problem, which is why rep doesnt work well when doing
  // other tasks
  //
  const [indexAsBigInt, setIndexAsBigInt] = useState<bigint>(BigInt(0));

  useEffect(() => {
    if (taskIndex !== undefined) {
      const indexToSet = taskIndex !== undefined ? BigInt(taskIndex) : BigInt(0);
      // console.log('taskIndex:', taskIndex);
      // console.log('indexAsBigInt:', indexAsBigInt);
      setIndexAsBigInt(indexToSet);
    }
  }, [taskIndex]);

  useEffect(() => {
    console.log("Task component mounted"); // This will log when the component mounts
  }, []);

  useEffect(() => {
    console.log("taskIndex has changed:", taskIndex); // This will log when taskIndex changes
  }, [taskIndex]);

  const { writeAsync: cycleManager } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "cycleManager",
    args: [indexAsBigInt],
  });

  const { writeAsync: writeGrade } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "gradeTask",
    args: [indexAsBigInt, gradeAsBigInt],
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    writeGrade();
  }

  function handleClick() {
    cycleManager();
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
                <button className="btn ml-2" onClick={handleClick}>
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
