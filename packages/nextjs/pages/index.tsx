"use client";

// import Link from 'next/link';
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { AddMember } from "~~/components/AddMember";
import { AddTask } from "~~/components/AddTask";
import { Reputation } from "~~/components/Reputation";
import { TaskDisplay } from "~~/components/TaskDisplay";
import { VotingQue } from "~~/components/VotingQue";

const Home: NextPage = () => {
  return (
    <>
      <header className="max-w-screen-xl mx-auto h-10">
        <div>DOMUS DAO</div>
      </header>
      <main className="flex">
        <div className="w-1/4 mx-3">
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
