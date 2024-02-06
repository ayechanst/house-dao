import React, { useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const AddMember = () => {
  const [memberName, setMemberName] = useState("");
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "addMember",
    args: [memberName],
    onBlockConfirmation: txnReceipt => {
      console.log("person created", txnReceipt.blockHash);
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    writeAsync();
  }

  return (
    <>
      <div className="card max-w-screen bg-base-100 shadow-xl mb-5">
        <form onSubmit={handleSubmit}>
          <div className="card-body p-5">
            <div className="flex">
              <input
                type="text"
                placeholder="Add a member!"
                onChange={e => setMemberName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
              <button type="submit" className="btn btn-primary ml-3">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
