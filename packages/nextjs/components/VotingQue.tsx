export const VotingQue = () => {
  return (
    <>
      <div className="card max-w-screen bg-base-100 shadow-xl mt-5">
        <div className="card-body p-5">
          <h2 className="card-title">Vote on this!</h2>
          <button className="btn btn-success">Approve</button>
          <button className="btn btn-error">Disapprove</button>
        </div>
      </div>
    </>
  );
};
