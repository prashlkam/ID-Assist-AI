
import React from 'react';
import { NAVIGATION } from '../constants';
import { AppTab } from '../types';

interface SidebarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-72 executive-gradient text-white h-screen fixed left-0 top-0 overflow-y-auto flex flex-col z-20 shadow-2xl">
      <div className="p-8">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <span className="bg-blue-500 w-8 h-8 rounded flex items-center justify-center text-sm">ID</span>
          Assist AI
        </h1>
        <p className="text-slate-400 text-xs mt-2 font-medium uppercase tracking-widest">Executive Boardroom Suite</p>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {NAVIGATION.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className={`${activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`}>
              {item.icon}
            </div>
            <span className="text-sm font-semibold tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-2xl p-4 flex items-center gap-3">
          <img src="https://picsum.photos/seed/director/40/40" alt="Avatar" className="w-10 h-10 rounded-full ring-2 ring-slate-700" />
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">Sir Adrian Vance</p>
            <p className="text-xs text-slate-400 truncate">Independent Director</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
