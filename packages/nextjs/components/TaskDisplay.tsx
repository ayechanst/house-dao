import { useScaffoldContractRead } from '~~/hooks/scaffold-eth';
import { Task } from './Task';

interface TaskObject {
  name: string;
  manager: string;
  taskForce: string[];
  status: number;
  index: number;
}

export const TaskDisplay = () => {
  const activeTasks: TaskObject[] = [];
  const { data: taskObjectArray } = useScaffoldContractRead({
    contractName: 'YourContract',
    functionName: 'getTasks',
  });

  taskObjectArray?.forEach((task: TaskObject) => {
    if (task.status == 1) {
      activeTasks.push(task);
    } else if (task.status == 2) {
      activeTasks.push(task);
    }
  });

  return (
    <>
      <div className="grid grid-cols-4 gap-3">
        {activeTasks?.map(task => {
          return (
            <Task
              key={task.index}
              taskName={task.name}
              taskManager={task.manager}
              taskForce={task.taskForce}
              taskStatus={task.status}
              taskIndex={task.index}
            />
          );
        })}
      </div>
    </>
  );
};
