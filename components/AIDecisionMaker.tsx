
import React, { useState } from 'react';
import { getAttendClassDecision } from '../geminiService.ts';

const AIDecisionMaker: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [attendance, setAttendance] = useState(75);
  const [importance, setImportance] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ decision?: string; reason?: string } | null>(null);

  const handleConsult = async () => {
    if (!subject) return;
    setLoading(true);
    try {
      const advice = await getAttendClassDecision(subject, attendance, importance);
      setResult(advice);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-800">Should I Attend?</h3>
      </div>

      <div className="space-y-4 flex-1">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Subject</label>
          <input 
            type="text" 
            placeholder="e.g. Data Structures"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Attendance %</label>
          <input 
            type="number" 
            className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            value={attendance}
            onChange={(e) => setAttendance(parseInt(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Topic Importance</label>
          <select 
            className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High (New Chapter)</option>
          </select>
        </div>

        <button 
          onClick={handleConsult}
          disabled={loading || !subject}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-purple-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Consulting AI...' : 'Ask AI Support'}
        </button>

        {result && (
          <div className={`mt-4 p-4 rounded-xl border animate-in fade-in slide-in-from-top-2 duration-300 ${result.decision === 'Yes' ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
            <p className={`text-lg font-bold mb-1 ${result.decision === 'Yes' ? 'text-emerald-700' : 'text-amber-700'}`}>
              Decision: {result.decision}
            </p>
            <p className="text-sm text-slate-600 italic">"{result.reason}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIDecisionMaker;
