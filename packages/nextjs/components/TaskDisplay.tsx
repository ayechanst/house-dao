import { Task } from './Task';
export const TaskDisplay = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-3">
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </>
  );
};
