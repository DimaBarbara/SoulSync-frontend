// app/dashboard/layout.tsx
import React from 'react';

export default function DashboardLayout({
  children,
  emotionBar,
  inputBar,
  moodChart,
}: {
  children: React.ReactNode;
  emotionBar: React.ReactNode;
  inputBar: React.ReactNode;
  moodChart: React.ReactNode;
}) {
  return (
    <div className='flex flex-col '>
        {children} 
      <main className="grid grid-cols-12 gap-5 py-10 pl-10 pr-7">
        <div className="col-span-12">{inputBar}</div>
        <div className="col-span-5">{emotionBar}</div>
        <div className="col-span-7">{moodChart}</div>
      </main>
    </div>
  );
}