import { AddMember } from './AddMember';
import { AddTask } from './AddTask';
import { VotingQue } from './VotingQue';
import { TaskDisplay } from './TaskDisplay';

export const Drawer = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        {/* ReputationDisplay goes here */}
        {/* TaskDisplay goes here */}
        <div className="flex flex-row justify-between items-center">
          {/* <div className=""> */}
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            Open drawer
          </label>
          {/* </div> */}
          <div className="flex flex-row-reverse pr-10">
            <TaskDisplay />
          </div>
        </div>
      </div>
      <div className="drawer-side w-1/2">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-1/2 min-h-full bg-base-200 text-base-content">
          <AddMember />
          <AddTask />
          <VotingQue />
        </ul>
      </div>
    </div>
  );
};
