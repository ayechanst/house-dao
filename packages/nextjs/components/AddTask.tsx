export const AddTask = () => {
  return (
    <>
      <div className="card max-w-screen bg-base-100 shadow-xl">
        <div className="card-body p-5">
          <h2 className="card-title">Suggest Task</h2>
          <input
            type="text"
            placeholder="Task name"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Task Members"
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn btn-primary ml-3">Add</button>
        </div>
      </div>
    </>
  );
};
