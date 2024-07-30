import React, { PropsWithChildren } from 'react';
import AuthenticationCardLogo from '@/components/AuthenticationCardLogo';

export default function AuthenticationCard({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <div
      className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-slate-800 bg-gradient-to-r from-rose-100 to-teal-100 dark:from-slate-700 dark:to-slate-800"
    >
      <div>
        <AuthenticationCardLogo />
      </div>

      <div
        className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-slate-700 shadow-md overflow-hidden sm:rounded-lg border dark:border-slate-600"
      >
        {children}
      </div>
    </div>
  );
}
