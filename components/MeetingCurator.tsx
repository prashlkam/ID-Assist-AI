
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader2, Save, History, FileText, CheckCircle } from 'lucide-react';
import { geminiService } from '../services/geminiService';

const MeetingCurator: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [transcriptionSnippet, setTranscriptionSnippet] = useState<string[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = window.setInterval(() => {
        setTimer((prev) => prev + 1);
        // Mock incoming real-time snippets for visual effect
        if (Math.random() > 0.7) {
          const mocks = [
            "Chairman: Let's discuss the ESG report...",
            "CFO: The EBITDA margins are stable at 18%...",
            "ID 1: I have concerns regarding the acquisition debt...",
            "CS: The minutes of previous meeting are tabled.",
            "CEO: We expect the new plant to be operational by Q3."
          ];
          setTranscriptionSnippet(prev => [mocks[Math.floor(Math.random() * mocks.length)], ...prev].slice(0, 5));
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setTimer(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRecording]);

  const handleStart = () => setIsRecording(true);
  const handleStop = async () => {
    setIsRecording(false);
    setLoading(true);
    try {
      // For this demo, we use a combined mock string of what would have been transcribed
      const fullText = transcriptionSnippet.join(" ") || "Chairman discussed expansion plans. CFO reviewed financials. Board approved the quarterly reports with minor corrections to CSR allocation.";
      const result = await geminiService.summarizeMinutes(fullText);
      setSummary(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Meeting Minutes Curator</h2>
            <p className="text-slate-500 font-medium">Capture real-time board discourse and generate curated summaries.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Session Status</p>
                <div className="flex items-center gap-2 font-mono font-bold text-xl tabular-nums">
                  <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`} />
                  {formatTime(timer)}
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6 h-80 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent pointer-events-none"></div>
              
              {!isRecording ? (
                <>
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-xl shadow-blue-500/20 group" onClick={handleStart}>
                    <Mic className="w-10 h-10 text-white group-hover:rotate-12 transition-transform" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-white font-bold text-lg">Start Secure Recording</h3>
                    <p className="text-slate-400 text-sm px-10">Real-time encryption and zero-retention transcription active.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-xl shadow-red-500/20 group" onClick={handleStop}>
                    <Square className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-white font-bold text-lg">Recording in Progress...</h3>
                    <p className="text-slate-400 text-sm">Transcribing dialogue streams to AI Curator.</p>
                  </div>
                </>
              )}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-64 overflow-y-auto font-mono text-sm">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <FileText className="w-3 h-3" /> Live Transcription Feed
              </h4>
              <div className="space-y-3">
                {transcriptionSnippet.length === 0 && <p className="text-slate-400 italic">Awaiting audio input...</p>}
                {transcriptionSnippet.map((s, i) => (
                  <p key={i} className="text-slate-700 border-l-2 border-blue-500 pl-3 py-1 bg-white/50 rounded-r-lg shadow-sm">
                    {s}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 h-full flex flex-col items-center justify-center text-center space-y-4">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                <div>
                  <h3 className="font-bold text-slate-900">Curating Insights</h3>
                  <p className="text-sm text-slate-500">LLM is identifying key decisions and dissenting notes...</p>
                </div>
              </div>
            ) : summary ? (
              <div className="bg-blue-50/30 border border-blue-100 rounded-3xl p-8 h-full shadow-inner overflow-y-auto animate-in fade-in duration-500">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                    AI Curation Complete
                  </h3>
                  <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
                    <Save className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <div className="prose prose-slate max-w-none prose-sm">
                  <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-medium">
                    {summary}
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 h-full flex flex-col items-center justify-center text-center text-slate-400">
                <History className="w-16 h-16 mb-4 opacity-10" />
                <p className="font-bold">No Summary Generated</p>
                <p className="text-sm">Summary will appear here after recording ends.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingCurator;
