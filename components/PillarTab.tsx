
import React from 'react';
import { ExternalLink, BookOpen, AlertCircle, TrendingUp, Search } from 'lucide-react';
import { MOCK_NEWS } from '../constants';
import { AppTab } from '../types';

interface PillarTabProps {
  type: 'CG' | 'ESG' | 'TECH';
}

const PillarTab: React.FC<PillarTabProps> = ({ type }) => {
  const news = MOCK_NEWS.filter(n => n.category === type);
  
  const content = {
    CG: {
      title: 'Corporate Governance',
      desc: 'Standards for fairness, accountability, and transparency.',
      focus: ['Related Party Transactions', 'Succession Planning', 'Audit Integrity'],
      mistakes: ['Satyam Computers (Accounting Fraud)', 'IL&FS (Risk Oversight Failure)']
    },
    ESG: {
      title: 'ESG Strategy',
      desc: 'Environmental, Social, and Governance integration for long-term value.',
      focus: ['Carbon Footprint Disclosure', 'Diversity & Inclusion', 'Ethical Sourcing'],
      mistakes: ['VW Emissions Scandal (Greenwashing)', 'BP Deepwater Horizon (Env. Risk)']
    },
    TECH: {
      title: 'Technology & AI',
      desc: 'Oversight of digital transformation and emerging risks.',
      focus: ['Cybersecurity Resilience', 'GenAI Ethics & Policy', 'Platform Regulation'],
      mistakes: ['CrowdStrike Outage (SLA Failures)', 'Facebook Cambridge Analytica (Data Privacy)']
    }
  }[type];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-slate-900">{content.title}</h2>
          <p className="text-slate-500 font-medium">{content.desc}</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search regulations..." 
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" /> News & Trends Summary
            </h3>
            <div className="space-y-6">
              {news.map(item => (
                <div key={item.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-200 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">{item.source}</span>
                      <h4 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">{item.title}</h4>
                    </div>
                    <span className="text-xs text-slate-400 font-bold">{item.date}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 font-medium leading-relaxed">{item.summary}</p>
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-amber-500" /> Executive "So What?"
                    </p>
                    <p className="text-sm text-slate-900 font-bold leading-relaxed">{item.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-900/20">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-blue-400">
              <BookOpen className="w-5 h-5" /> Current Board Focus
            </h3>
            <div className="space-y-3">
              {content.focus.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors cursor-default">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-sm font-semibold">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-rose-50 rounded-3xl p-6 border border-rose-100">
            <h3 className="font-bold text-rose-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600" /> Case Studies (Mistakes)
            </h3>
            <div className="space-y-4">
              {content.mistakes.map((m, i) => (
                <div key={i} className="p-4 bg-white rounded-2xl border border-rose-200 shadow-sm">
                   <p className="text-xs font-bold text-rose-800">{m}</p>
                   <button className="mt-2 text-[10px] font-bold text-rose-600 flex items-center gap-1 hover:underline uppercase">
                     Full Review <ExternalLink className="w-2 h-2" />
                   </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PillarTab;
