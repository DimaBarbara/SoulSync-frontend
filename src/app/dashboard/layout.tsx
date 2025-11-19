import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";

export default async function DashboardLayout({
  children,
  emotionBar,
  inputBar,
  moodChart,
  advise,
}: {
  children: React.ReactNode;
  emotionBar: React.ReactNode;
  inputBar: React.ReactNode;
  moodChart: React.ReactNode;
  advise: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken");

  if (!token) {
    redirect("/?showLogin=true");
  }

  return (
    <div className="flex flex-col mb-30 xl:mb-0">
      {children}
      <main className="grid grid-cols-12 gap-5 py-10 pl-10 pr-7">
        <div className="col-span-12">{inputBar}</div>
        <div className="col-span-12 md:col-span-5 flex flex-col gap-5">
          {emotionBar}
           {advise}
        </div>
        <div className="col-span-12 md:col-span-7 h-full">
          {moodChart}
        </div>
      </main>
    </div>
  );
}