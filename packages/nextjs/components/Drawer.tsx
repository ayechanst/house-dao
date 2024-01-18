import { AddMember } from './AddMember';
import { AddTask } from './AddTask';

export const Drawer = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Open drawer
        </label>
      </div>
      <div className="drawer-side w-1/2">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-1/2 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <AddMember />
          <AddTask />
        </ul>
      </div>
    </div>
  );
};
