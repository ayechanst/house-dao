import { useEffect, useState } from "react";
import { Task } from "./Task";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface TaskObject {
  name: string;
  manager: string;
  taskForce: readonly string[];
  status: number;
  taskIndex: bigint;
}

export const TaskDisplay = () => {
  const [activeTasks, setActiveTasks] = useState<TaskObject[]>([]);

  const { data: taskObjectArray } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getTasks",
  });

  if (taskObjectArray) {
    const filteredTasks = taskObjectArray.filter(task => task.status === 1 || task.status === 2);
    setActiveTasks(filteredTasks);
  }

  return (
    <>
      <div className="grid grid-cols-3">
        {activeTasks?.map(task => {
          const mutableTaskForce = task.taskForce.slice();
          return (
            <Task
              key={task.taskIndex}
              taskName={task.name}
              taskManager={task.manager}
              taskForce={mutableTaskForce}
              taskStatus={task.status}
              taskIndex={task.taskIndex}
            />
          );
        })}
      </div>
    </>
  );
};
