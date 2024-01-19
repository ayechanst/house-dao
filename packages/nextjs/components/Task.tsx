import { useScaffoldContractWrite } from '~~/hooks/scaffold-eth';

interface TaskProps {
  taskName: string;
  taskManager: string;
  taskForce: string[];
  taskStatus: number;
}

export const Task = ({
  taskName,
  taskManager,
  taskForce,
  taskStatus,
}: TaskProps) => {
  const { writeAsync: writeComplete } = useScaffoldContractWrite({
    contractName: 'YourContract',
    functionName: 'completeTask',
    args: [taskIndex],
    onBlockConfirmation: txnReceipt => {
      console.log('purchase logged', txnReceipt.blockHash);
    },
  });

  function handleComplete() {
    writeComplete();
  }

  const { writeAsync: writeGrade } = useScaffoldContractWrite({
    contractName: 'YourContract',
    functionName: 'gradeTask',
    args: [taskIndex, taskGrade],
    onBlockConfirmation: txnReceipt => {
      console.log('purchase logged', txnReceipt.blockHash);
    },
  });

  function handleGrade() {
    writeGrade();
  }

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body p-5">
          <h2 className="card-title">{taskName}</h2>
          <p>{taskManager}</p>
          <p>{taskForce}</p>
          <div className="card-actions justify-center">
            {taskStatus == 1 && (
              <button onClick={handleComplete} className="btn btn-primary">
                Done
              </button>
            )}
            {taskStatus == 2 && (
              <button onClick={handleGrade} className="btn btn-primary">
                Grade
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
