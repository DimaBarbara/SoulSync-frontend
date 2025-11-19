import { Suspense } from 'react';
import SearchHandler from './SearchHandler'; 
import HomeClient from './HomeClient';

export default function Home() {
  return (
    <div>
      <HomeClient />
      <Suspense fallback={null}>
        <SearchHandler />
      </Suspense>
    </div>
  );
}