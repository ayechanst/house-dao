import Link from 'next/link';
import type { NextPage } from 'next';
import {
  BugAntIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { MetaHeader } from '~~/components/MetaHeader';
import { Drawer } from '~~/components/Drawer';

const Home: NextPage = () => {
  return (
    <>
      <div>DOMUS DAO</div>
      <Drawer />
      <div>other stuff</div>
    </>
  );
};

export default Home;
