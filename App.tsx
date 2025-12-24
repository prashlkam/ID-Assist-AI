
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ResolutionResolver from './components/ResolutionResolver';
import MeetingCurator from './components/MeetingCurator';
import TrackRecord from './components/TrackRecord';
import PillarTab from './components/PillarTab';
import Auth from './components/Auth';
import { AppTab } from './types';
import { Search, Bell, Settings, Calendar, ChevronRight, Activity, Users, Target, LogOut } from 'lucide-react';

const DashboardOverview: React.FC = () => (
  <div className="space-y-8 animate-in fade-in duration-700">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        { label: 'Upcoming Boards', value: '3', icon: <Calendar className="text-blue-500" />, sub: 'Next: Oct 28 (Tech Ltd)' },
        { label: 'Active Resolutions', value: '12', icon: <Activity className="text-emerald-500" />, sub: '4 require high scrutiny' },
        { label: 'Fiduciary Score', value: '98%', icon: <Target className="text-purple-500" />, sub: 'Based on activity history' },
        { label: 'Peer Network', value: '240+', icon: <Users className="text-amber-500" />, sub: 'ID Community insights' },
      ].map((card, i) => (
        <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-50 rounded-2xl">{card.icon}</div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{card.label}</p>
          <h3 className="text-3xl font-black text-slate-900 mt-1">{card.value}</h3>
          <p className="text-xs text-slate-400 font-bold mt-2 uppercase tracking-wide">{card.sub}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Strategy & Insight Timeline</h3>
        <div className="space-y-8 relative before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
          {[
            { title: 'Global ESG Shift', time: '2 hours ago', desc: 'EU adopts more stringent Scope 3 reporting guidelines. Impacts heavy manufacturing sectors.', color: 'bg-blue-500' },
            { title: 'Cyber Liability Alert', time: '5 hours ago', desc: 'Recent court ruling in Delaware expands director liability for cybersecurity negligence.', color: 'bg-rose-500' },
            { title: 'AI Board Guidelines', time: 'Yesterday', desc: 'OECD releases new framework for AI governance in corporate boards.', color: 'bg-purple-500' }
          ].map((item, i) => (
            <div key={i} className="relative pl-10 group">
              <div className={`absolute left-1 top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm transition-transform group-hover:scale-125 z-10 ${item.color}`} />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</p>
              <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</h4>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
          <h3 className="text-lg font-bold mb-4">Regulatory Watchlist</h3>
          <div className="space-y-4">
            {['SEBI Listing Regs', 'Companies Act 2013', 'UK Corp Gov Code', 'BRSR Reporting'].map((reg, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors cursor-pointer group">
                <span className="text-sm font-bold">{reg}</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-blue-600 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">View All Compliance</button>
        </div>

        <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
          <h3 className="text-lg font-bold text-blue-900 mb-2">My ID Impact</h3>
          <p className="text-blue-700/80 text-sm mb-4 font-medium">Your contributions have impacted 14 board decisions this fiscal year.</p>
          <div className="h-2 w-full bg-blue-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-3/4 rounded-full shadow-lg" />
          </div>
          <p className="text-[10px] font-bold text-blue-600 mt-2 uppercase tracking-widest text-right">Target: 20 Insights</p>
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  const handleLogin = (userData: { name: string; role: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD: return <DashboardOverview />;
      case AppTab.RESOLVER: return <ResolutionResolver />;
      case AppTab.CURATOR: return <MeetingCurator />;
      case AppTab.TRACK_RECORD: return <TrackRecord />;
      case AppTab.GOVERNANCE: return <PillarTab type="CG" />;
      case AppTab.ESG: return <PillarTab type="ESG" />;
      case AppTab.TECH: return <PillarTab type="TECH" />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-72 p-10">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Global insight search..." 
                className="pl-11 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-96 shadow-sm transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors text-slate-600 shadow-sm relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" />
            </button>
            <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={handleLogout}
              className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all text-slate-600 shadow-sm flex items-center gap-2 group"
              title="Logout Executive Session"
            >
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="h-10 w-[1px] bg-slate-200 mx-2" />
            <button className="px-5 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Book Council
            </button>
          </div>
        </header>

        {renderContent()}
      </main>

      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group">
          <Search className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <div className="absolute right-full mr-4 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Ask AI Assistant
          </div>
        </button>
      </div>
    </div>
  );
};

export default App;
