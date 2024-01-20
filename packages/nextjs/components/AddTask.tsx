import React, { useState } from 'react';
import { useScaffoldContractRead } from '~~/hooks/scaffold-eth';
import { useScaffoldContractWrite } from '~~/hooks/scaffold-eth';

export const AddTask = () => {
  const [taskForce, setCheckboxData] = useState<string[]>([]);
  const [taskName, setTaskName] = useState('');
  const { data: memberArray } = useScaffoldContractRead({
    contractName: 'YourContract',
    functionName: 'getMembers',
  });

  const { writeAsync } = useScaffoldContractWrite({
    contractName: 'YourContract',
    functionName: 'addTask',
    args: [taskName, taskForce],
    onBlockConfirmation: txnReceipt => {
      console.log('Task added', txnReceipt.blockHash);
    },
  });

  let readArray: string[] = [];

  memberArray?.forEach((member: string) => readArray.push(member));

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    writeAsync();
  }

  function handleCheckbox(name: string) {
    setCheckboxData(prevNames => {
      // if the array has the name, remove it
      if (prevNames.includes(name)) {
        return prevNames.filter(n => n !== name);
      } else {
        // if the array doesn't, add it
        return [...prevNames, name];
      }
    });
  }

  return (
    <>
      <div className="card max-w-screen bg-base-100 shadow-xl">
        <div className="card-body p-5">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Suggest a task!"
              className="input input-bordered w-full max-w-xs"
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
            />
            {readArray?.map((name, index) => (
              <div key={index} className="py-1">
                <label className="flex">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => handleCheckbox(name)}
                  />
                  <div className="px-3">{name}</div>
                </label>
              </div>
            ))}
            <button type="submit" className="btn btn-primary ml-3">
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
