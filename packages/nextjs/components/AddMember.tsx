export const AddMember = () => {
  return (
    <>
      <div className="card max-w-screen bg-base-100 shadow-xl mb-5">
        <div className="card-body p-5">
          <h2 className="card-title">Add Member</h2>
          <div className="flex">
            <input
              type="text"
              placeholder="Member name"
              className="input input-bordered w-full max-w-xs"
            />
            <button className="btn btn-primary ml-3">Add</button>
          </div>
        </div>
      </div>
    </>
  );
};
