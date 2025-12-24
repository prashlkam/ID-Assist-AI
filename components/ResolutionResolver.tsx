
import React, { useState } from 'react';
import { Upload, FileText, AlertTriangle, CheckCircle, Info, Loader2, Search } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ResolutionAnalysis } from '../types';

const ResolutionResolver: React.FC = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<ResolutionAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const result = await geminiService.analyzeResolution(text);
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Failed to analyze the resolution. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sampleResolution = `Board Resolution No. 102/2023: Proposed Capital Expenditure for New Manufacturing Facility in Pune. The management proposes an investment of INR 450 Crores for the establishment of a state-of-the-art EV battery assembly unit. Financing will be 60% through long-term debt and 40% through internal accruals. This aligns with the company's 2030 Sustainability Charter. The land acquisition is from a subsidiary of the parent group.`;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Resolution Resolver</h2>
        <p className="text-slate-500 mb-6 font-medium">Upload agenda notes or paste resolution text for a fiduciary risk assessment.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste the resolution text here..."
                className="w-full h-80 p-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-slate-700 leading-relaxed font-medium"
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button 
                  onClick={() => setText(sampleResolution)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 shadow-sm"
                >
                  Load Sample
                </button>
              </div>
            </div>
            
            <button
              onClick={handleAnalyze}
              disabled={loading || !text}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              {loading ? 'Running AI Fiduciary Analysis...' : 'Perform Executive Analysis'}
            </button>
          </div>

          <div className="space-y-6">
            {!analysis && !loading && (
              <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 rounded-3xl text-center text-slate-400">
                <FileText className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-semibold">Analysis Results will appear here</p>
                <p className="text-sm">Identify conflicts, risks, and recommended inquiries instantly.</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center p-12 bg-slate-50 rounded-3xl space-y-4">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                <div className="text-center">
                  <p className="font-bold text-slate-700">Scrutinizing Documentation</p>
                  <p className="text-sm text-slate-500">Evaluating against Companies Act & ESG Frameworks...</p>
                </div>
              </div>
            )}

            {analysis && (
              <div className="space-y-6 animate-in zoom-in-95 duration-500">
                <div className={`p-4 rounded-2xl border-l-4 flex items-center justify-between ${
                  analysis.riskLevel === 'High' ? 'bg-red-50 border-red-500 text-red-700' :
                  analysis.riskLevel === 'Medium' ? 'bg-amber-50 border-amber-500 text-amber-700' :
                  'bg-emerald-50 border-emerald-500 text-emerald-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6" />
                    <span className="font-bold text-lg uppercase tracking-tight">Risk Level: {analysis.riskLevel}</span>
                  </div>
                  <Info className="w-5 h-5 opacity-50 cursor-help" title="Risk calculated based on financial exposure and compliance factors." />
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
                  <h3 className="font-bold mb-4 flex items-center gap-2 border-b border-slate-700 pb-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    Suggested Inquiries for Management
                  </h3>
                  <ul className="space-y-3">
                    {analysis.inquiries.map((q, i) => (
                      <li key={i} className="text-sm font-medium leading-relaxed flex gap-3">
                        <span className="text-blue-400 font-bold">{i+1}.</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                    <h4 className="text-sm font-bold text-emerald-800 mb-2 uppercase tracking-wide">Primary Pros</h4>
                    <ul className="space-y-1">
                      {analysis.pros.map((p, i) => (
                        <li key={i} className="text-xs text-emerald-700 font-medium">• {p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
                    <h4 className="text-sm font-bold text-rose-800 mb-2 uppercase tracking-wide">Key Risks</h4>
                    <ul className="space-y-1">
                      {analysis.cons.map((c, i) => (
                        <li key={i} className="text-xs text-rose-700 font-medium">• {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest flex items-center gap-2">
                    <FileText className="w-3 h-3" />
                    Regulatory Compliance Context
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {analysis.complianceNotes}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResolutionResolver;
