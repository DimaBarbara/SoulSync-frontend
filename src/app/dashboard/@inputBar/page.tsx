'use client';

import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '@/app/StoreProvider';


const MoodInput = () => {
    const { store } = useContext(Context);

    const [moodText, setMoodText] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const handleSendMood = async () => {
        if (moodText.trim() === '') {
            return;
        }

        setIsLoading(true); 
        
        try {
            await store.sendMood(moodText);
            
            setMoodText(''); 
        } catch (error) {
            console.error('Error sending mood:', error);
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className='flex bg-neutral-100 p-2 items-center rounded-4xl shadow-md'>
            <input
                type='text'
                value={moodText}
                onChange={(e) => setMoodText(e.target.value)}
                placeholder='Describe your mood...'
                className='flex-1 p-3 rounded-4xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-200'
            />
            <button
                onClick={handleSendMood}
                disabled={isLoading}
                className={`flex-shrink-0 ml-2 px-6 py-3 rounded-4xl w-30 items-center justify-center font-bold
                    ${isLoading ? 'bg-amber-300 cursor-not-allowed' : 'bg-amber-200 hover:bg-amber-300 focus:bg-amber-300 transition-colors duration-300 ease-in-out'}`}
            >
                {isLoading ? 'Sending...' : 'Send'}
            </button>
        </div>
    );
};

export default observer(MoodInput);