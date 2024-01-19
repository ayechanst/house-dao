import { useScaffoldContractRead } from '~~/hooks/scaffold-eth';

export const Reputation = () => {
  const { data: memberArray } = useScaffoldContractRead({
    contractName: 'YourContract',
    functionName: 'getMembers',
  });

  let readArray: string[] = [];

  memberArray?.forEach(member => readArray.push(member));

  return (
    <>
      <div className="card max-w-screen bg-base-100 shadow-xl mb-3">
        <div className="card-body">
          <h2 className="card-title">Reputation</h2>
          {readArray.map(member => {
            return (
              <>
                <div>Hello</div>
                <div>{member}</div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
