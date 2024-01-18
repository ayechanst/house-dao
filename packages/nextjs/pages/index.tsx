'use client';
// import Link from 'next/link';
import type { NextPage } from 'next';
import {
  BugAntIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Drawer } from '~~/components/Drawer';

const Home: NextPage = () => {
  return (
    <>
      <header className="max-w-screen-xl mx-auto h-10">
        <div>DOMUS DAO</div>
      </header>
      <Drawer />
    </>
  );
};

export default Home;
