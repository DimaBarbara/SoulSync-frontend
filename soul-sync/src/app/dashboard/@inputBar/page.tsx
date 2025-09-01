'use client';

import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '@/app/StoreProvider';

const MoodInput = () => {
  const { store } = useContext(Context);
  const [moodText, setMoodText] = useState('');
  const [isValidMood, setIsValidMood] = useState(false);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMoodText(value);
    const regex = /^[A-Za-z]/;
    setIsValidMood(regex.test(value));
  };

  const handleSendMood = async () => {
    if (!isValidMood || store.isLoading) {
      return;
    }

    store.setIsLoading(true);

    try {
      await store.sendMood(moodText);
      setMoodText('');
      setIsValidMood(false); 
    } catch (error) {
      console.error('Error sending mood:', error);
    } finally {
      store.setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-neutral-100 p-2 sm:p-4 rounded-3xl sm:rounded-4xl shadow-md">
      <div className="flex items-center w-full">
        <input
          type="text"
          value={moodText}
          onChange={handleInputChange}
          placeholder="Describe your mood (min 10 English letters)..."
          className={`flex-1 p-3 rounded-3xl sm:rounded-4xl bg-white focus:outline-none focus:ring-2 transition-colors duration-300 ease-in-out ${
            isValidMood ? 'focus:ring-green-500 border-green-500' : 'focus:ring-red-500 border-red-500'
          }`}
        />
        <button
          onClick={handleSendMood}
          disabled={!isValidMood || store.isLoading}
          className={`flex-shrink-0 ml-2 px-6 py-3 rounded-3xl sm:rounded-4xl items-center justify-center font-bold text-sm sm:text-base transition-colors duration-300 ease-in-out
            ${!isValidMood || store.isLoading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-amber-200 hover:bg-amber-300 focus:bg-amber-300'
            }`}
        >
          {store.isLoading ? '...' : 'Send'}
        </button>
      </div>
      {!isValidMood && moodText.length > 0 && (
        <p className="text-red-500 text-xs px-2 sm:px-3">
          Error: Please use only English letters, and your text must be at least 10 characters long.
        </p>
      )}
    </div>
  );
};

export default observer(MoodInput);
