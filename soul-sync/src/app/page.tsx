'use client'

import { useContext, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Context } from './StoreProvider';
import Greetings from './components/Greetings';
import GreetingsImage from './components/GreetingImage';
import FactsAboutAI from './components/FactsAboutAi';
import { observer } from 'mobx-react-lite';
import { useCheckAuth } from '@/lib/hooks/useCheckAuth';

function Home() {
  useCheckAuth()
  const searchParams = useSearchParams();
  const router = useRouter();
  const { store } = useContext(Context)

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; 

    const showLoginParam = searchParams.get('showLogin');
    if (showLoginParam === 'true') {
      store.setLoginModalOpen(true);

      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete('showLogin');
      router.replace(`/?${newSearchParams.toString()}`);
    }
  }, [searchParams, router, store, isClient]);

  return (
        <div>
            <div className="flex gap-6 sm: flex-col xl:flex-row ">
                <div className="flex-2">
                    <Greetings />
                </div>
                <div className="flex-1">
                    <GreetingsImage />
                </div>
            </div>
            <FactsAboutAI />
        </div>
    );
}

export default observer(Home);