'use client';

import SettingsSidebar from './SettingsSidebar';
import { useState } from 'react';

export default function SettingsLayout() {
  const [activeSection, setActiveSection] = useState('general');

  return (
    <div className="flex h-screen">
      {/* Left collapsed main sidebar */}
      <div className="w-[64px] bg-white border-r flex flex-col items-center py-4">
        {/* Just the settings icon */}
        <div className="text-blue-600 bg-blue-100 p-2 rounded-md">
          <svg width="24" height="24" fill="currentColor"><path d="..." /></svg>
        </div>
        {/* Add more icons here if needed */}
      </div>

      {/* Settings vertical sidebar */}
      <SettingsSidebar active={activeSection} onChange={setActiveSection} />

      {/* Main content placeholder */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Settings Content: {activeSection}</h2>
        {/* This is where forms will go */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <p>This is placeholder content for <strong>{activeSection}</strong>.</p>
        </div>
      </div>
    </div>
  );
}
