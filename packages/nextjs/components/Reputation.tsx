import { useScaffoldContractRead } from '~~/hooks/scaffold-eth';
import React, { useState } from 'react';

export const Reputation = () => {
  const [memberName, setMemberName] = useState('');
  const { data: memberArray } = useScaffoldContractRead({
    contractName: 'YourContract',
    functionName: 'getMembers',
  });

  const { data: reputationArray } = useScaffoldContractRead({
    contractName: 'YourContract',
    functionName: 'getReputation',
    args: [memberName],
  });

  let readArray: string[] = [];
  memberArray?.forEach(member => readArray.push(member as string));

  function handleClick(member: string) {
    reputationArray(member);
  }

  return (
    <>
      <div className="card bg-base-100 shadow-xl mb-3">
        <div className="card-body">
          <h2 className="card-title">Reputation</h2>
          <div className="grid grid-cols-4 gap-3">
            {readArray.map((member, index) => (
              <button
                onClick={() => {
                  setMemberName({ member });
                  handleClick(member);
                }}
                key={index}
                className="btn btn-primary"
              >
                {member}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
