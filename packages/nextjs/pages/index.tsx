"use client";

// import Link from 'next/link';
import type { NextPage } from "next";
import { AddMember } from "~~/components/AddMember";
import { AddTask } from "~~/components/AddTask";
import { Reputation } from "~~/components/Reputation";
import { TaskDisplay } from "~~/components/TaskDisplay";
import { VotingQue } from "~~/components/VotingQue";

const Home: NextPage = () => {
  return (
    <>
      <header className="max-w-screen-xl mx-auto h-10">
        <div className="text-3xl font-bold">DOMUS DAO</div>
      </header>
      <main className="flex justify-between">
        <div className="w-1/4 ml-3">
          <AddMember />
          <Reputation />
          <AddTask />
          <VotingQue />
        </div>
        <div className="w-3/4">
          <TaskDisplay />
        </div>
      </main>
    </>
  );
};

export default Home;
