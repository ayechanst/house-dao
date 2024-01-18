export const AddTask = () => {
  return (
    <>
      <div className="card max-w-screen bg-base-100 shadow-xl">
        <div className="card-body p-5">
          <input
            type="text"
            placeholder="Suggest a task!"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Who's doing it?"
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn btn-primary ml-3">Add</button>
        </div>
      </div>
    </>
  );
};
