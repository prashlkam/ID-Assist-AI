
import React, { useState, useEffect } from 'react';
import { Plus, Award, FileText, Loader2, Trash2, Send } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { TrackRecordItem } from '../types';

const TrackRecord: React.FC = () => {
  const [items, setItems] = useState<TrackRecordItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  
  // Form state
  const [company, setCompany] = useState('');
  const [impact, setImpact] = useState('');
  const [category, setCategory] = useState('Governance');

  useEffect(() => {
    const stored = localStorage.getItem('id_track_record');
    if (stored) setItems(JSON.parse(stored));
  }, []);

  const saveItems = (newItems: TrackRecordItem[]) => {
    setItems(newItems);
    localStorage.setItem('id_track_record', JSON.stringify(newItems));
  };

  const handleAdd = () => {
    if (!company || !impact) return;
    const newItem: TrackRecordItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      company,
      impact,
      category
    };
    saveItems([newItem, ...items]);
    setCompany('');
    setImpact('');
  };

  const handleDelete = (id: string) => {
    saveItems(items.filter(item => item.id !== id));
  };

  const handleGenerateSummary = async () => {
    if (items.length === 0) return;
    setGenerating(true);
    try {
      const res = await geminiService.generateTrackRecordSummary(items);
      setSummary(res);
    } catch (error) {
      console.error(error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" /> Log Impact Item
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Company / Board</label>
                <input 
                  type="text" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Global Tech Solutions"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Impact Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
                >
                  <option>Governance</option>
                  <option>ESG / Sustainability</option>
                  <option>Digital / Cyber</option>
                  <option>Audit / Risk</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Action / Contribution</label>
                <textarea 
                  rows={4}
                  value={impact}
                  onChange={(e) => setImpact(e.target.value)}
                  placeholder="e.g. Challenged RPT valuation, leading to a 15% revision in favor of minority shareholders."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium resize-none"
                />
              </div>
              <button 
                onClick={handleAdd}
                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" /> Save Record
              </button>
            </div>
          </div>

          <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20">
            <h3 className="font-bold mb-2">Resume Generator</h3>
            <p className="text-blue-100 text-sm mb-4">AI converts your impact logs into professional board summaries for annual reports.</p>
            <button 
              onClick={handleGenerateSummary}
              disabled={generating || items.length === 0}
              className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              Generate Profile Summary
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {summary && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 animate-in slide-in-from-top-4 duration-500">
              <h3 className="font-bold text-emerald-900 mb-4 flex items-center justify-between">
                Executive Profile Summary
                <button onClick={() => setSummary(null)} className="text-emerald-600 hover:text-emerald-800"><Trash2 className="w-4 h-4" /></button>
              </h3>
              <div className="text-emerald-800 text-sm leading-relaxed font-medium whitespace-pre-wrap">
                {summary}
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 min-h-[400px]">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Impact History</h3>
            {items.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-center">
                <Award className="w-12 h-12 mb-2 opacity-10" />
                <p className="font-bold">No records found</p>
                <p className="text-sm">Start tracking your contributions for the Annual Report.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-start gap-4 group">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded leading-none">{item.category}</span>
                        <span className="text-xs font-bold text-slate-400">{item.date}</span>
                      </div>
                      <h4 className="font-bold text-slate-900">{item.company}</h4>
                      <p className="text-sm text-slate-600 font-medium">{item.impact}</p>
                    </div>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackRecord;
