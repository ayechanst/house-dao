import { useScaffoldContractRead } from '~~/hooks/scaffold-eth';

export const Reputation = () => {
  const { data: memberArray } = useScaffoldContractRead({
    contractName: 'YourContract',
    functionName: 'getMembers',
  });

  const { data: reputationArray } = useScaffoldContractRead({
    contractName: 'YourContract',
    functionName: 'getReputation',
  });

  // const gradeAsBigInt = taskGrade !== undefined ? BigInt(taskGrade) : BigInt(0);

  let readArray: string[] = [];
  let repArray: number[] = [];

  reputationArray?.forEach(rep => repArray.push(Number(rep)));
  memberArray?.forEach(member => readArray.push(member as string));

  console.log('repArray: ', repArray);

  return (
    <>
      <div className="card bg-base-100 shadow-xl mb-3">
        <div className="card-body">
          <h2 className="card-title">Reputation</h2>
          <div className="grid grid-cols-4 gap-3">
            {readArray.map(member => {
              return (
                <>
                  <div key={member}>
                    <div>{member}</div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
