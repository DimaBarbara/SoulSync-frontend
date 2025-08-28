import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
    const [moodText, setMoodText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // A simple regex to check for non-English characters.
    const isEnglish = (text: string): boolean => /^[A-Za-z0-9\s.,!?'"#$%&()*+-\/|:;<=>@\[\]^_`{|}~]*$/.test(text);

    const handleSendMood = async () => {
        // --- Validation Logic ---
        if (moodText.trim().length < 5) {
            toast.error('Please enter at least 5 characters.');
            return;
        }

        if (!isEnglish(moodText)) {
            toast.error('Only English is supported for this request.');
            return;
        }

        setIsLoading(true); 
        
        try {
            // Simulating an API call with a delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setMoodText(''); 
            toast.success('Your mood has been sent!');
        } catch (error) {
            console.error('Error sending mood:', error);
            toast.error('Failed to send mood. Please try again.');
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 font-sans">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
                    @import url('https://cdnjs.cloudflare.com/ajax/libs/react-toastify/9.1.1/ReactToastify.min.css');
                    body {
                        font-family: 'Inter', sans-serif;
                    }
                `}
            </style>
            <div className='flex flex-col w-full max-w-lg bg-white rounded-xl shadow-lg p-6 space-y-4'>
                <h1 className="text-2xl font-bold text-center text-gray-800">How are you feeling today?</h1>
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
                        className={`flex-shrink-0 ml-2 px-6 py-3 rounded-4xl w-30 items-center justify-center font-bold text-white
                            ${isLoading ? 'bg-amber-300 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 focus:bg-amber-600 transition-colors duration-300 ease-in-out'}`}
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
            {/* The ToastContainer is where the notifications will be displayed */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default App;
