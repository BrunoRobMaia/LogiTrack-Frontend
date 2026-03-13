"use client";

import { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
  title: string;
  subTitle: string;
  icon: ReactNode;
}

export function Header({ children, title, subTitle, icon }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-md shadow-blue-100">
            {icon}
          </div>
          <div>
            <h1 className="text-lg font-bold text-blue-700 leading-tight">
              {title}
            </h1>
            <p className="text-xs text-gray-400">{subTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </header>
  );
}
