
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.tsx';
import DashboardHeader from './components/DashboardHeader.tsx';
import { MOCK_SUBJECTS, MOCK_REMARKS, MOCK_ASSIGNMENTS, MOCK_PERFORMANCE, COLORS } from './constants.tsx';
import AttendancePredictor from './components/AttendancePredictor.tsx';
import AIDecisionMaker from './components/AIDecisionMaker.tsx';
import ChatBot from './components/ChatBot.tsx';
import { getAcademicAnalysis } from './geminiService.ts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell } from 'recharts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const performAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const summary = await getAcademicAnalysis({
        subjects: MOCK_SUBJECTS,
        cgpa: 8.18,
        pendingAssignments: MOCK_ASSIGNMENTS.filter(a => a.status === 'pending').length
      });
      setAiAnalysis(summary || "Analysis complete. Focus on Mathematics attendance.");
    } catch (e) {
      setAiAnalysis("Could not generate AI summary. Check your connectivity.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'dashboard' && !aiAnalysis) {
      performAnalysis();
    }
  }, [activeTab]);

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* AI Insight Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-3xl shadow-xl shadow-blue-100 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg backdrop-blur-md">AI Intelligence</span>
              <div className="h-1 w-1 rounded-full bg-white animate-pulse"></div>
            </div>
            <h2 className="text-white font-bold text-xl mb-1">Semester Pulse Analysis</h2>
            <p className="text-blue-100 text-sm italic max-w-2xl leading-relaxed">
              {isAnalyzing ? "Gemini is scanning your performance data..." : aiAnalysis || "Click to analyze progress."}
            </p>
          </div>
          <button 
            onClick={performAnalysis}
            disabled={isAnalyzing}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-2xl text-sm font-bold backdrop-blur-xl transition-all active:scale-95 disabled:opacity-50"
          >
            {isAnalyzing ? "Analyzing..." : "Refresh Summary"}
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Overall CGPA', value: '8.18', sub: '+0.13 from last sem', color: 'blue', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
          { label: 'Attendance', value: '77.2%', sub: 'Safe (75% min)', color: 'emerald', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
          { label: 'Pending Work', value: '4', sub: '2 due this week', color: 'amber', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
          { label: 'Avg Marks', value: '71.5', sub: 'Top 25% of class', color: 'indigo', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                </svg>
              </div>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Academic Trajectory</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_PERFORMANCE}>
                  <defs>
                    <linearGradient id="colorCgpa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="semester" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 10]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="sgpa" stroke={COLORS.primary} fillOpacity={1} fill="url(#colorCgpa)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Subject Wise Attendance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_SUBJECTS.map((sub) => (
                <div key={sub.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{sub.name}</h4>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">{sub.code}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                      sub.attendance >= 75 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {sub.attendance}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                    <div className={`h-2 rounded-full transition-all duration-1000 ${sub.attendance >= 80 ? 'bg-emerald-500' : sub.attendance >= 75 ? 'bg-blue-500' : 'bg-rose-500'}`} style={{ width: `${sub.attendance}%` }}></div>
                  </div>
                  <AttendancePredictor currentAttended={sub.attendedClasses} currentTotal={sub.totalClasses} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <AIDecisionMaker />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Remarks</h3>
            <div className="space-y-4">
              {MOCK_REMARKS.map((remark) => (
                <div key={remark.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${remark.type === 'positive' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{remark.subject}</p>
                  </div>
                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">"{remark.text}"</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>{remark.professor}</span>
                    <span>{remark.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Attendance Monitoring</h2>
          <p className="text-slate-500 mt-1">Detailed breakdown of your presence in all modules.</p>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center space-x-1 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium border border-emerald-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Safe (>75%)</span>
          </div>
          <div className="flex items-center space-x-1 px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-xs font-medium border border-rose-100">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>Critical (<70%)</span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 text-left">
              <th className="pb-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Subject</th>
              <th className="pb-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Held</th>
              <th className="pb-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Attended</th>
              <th className="pb-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Current %</th>
              <th className="pb-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {MOCK_SUBJECTS.map((sub) => (
              <tr key={sub.id} className="group hover:bg-slate-50 transition-colors">
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">{sub.code.substring(0, 2)}</div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{sub.name}</p>
                      <p className="text-xs text-slate-400">{sub.code}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-sm text-slate-600">{sub.totalClasses}</td>
                <td className="py-4 text-sm text-slate-600">{sub.attendedClasses}</td>
                <td className="py-4 font-bold text-slate-700">{sub.attendance}%</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${sub.attendance >= 75 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{sub.attendance >= 75 ? 'Safe' : 'Critical'}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Class Relative Score</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_SUBJECTS}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="code" stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="marks" radius={[4, 4, 0, 0]}>
                {MOCK_SUBJECTS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.marks > entry.classAverage ? COLORS.success : COLORS.danger} />
                ))}
              </Bar>
              <Bar dataKey="classAverage" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 mb-4">SGPA History</h3>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_PERFORMANCE}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="semester" stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} domain={[0, 10]} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="sgpa" stroke={COLORS.primary} strokeWidth={4} dot={{ r: 6, fill: COLORS.primary, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Highest SGPA</p>
            <p className="text-xl font-bold text-slate-800">8.5</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Current CGPA</p>
            <p className="text-xl font-bold text-slate-800">8.18</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAssignments = () => (
    <div className="space-y-8 animate-in zoom-in-95 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-between">
            <span>Pending Submissions</span>
            <span className="px-2 py-1 bg-amber-50 text-amber-600 rounded-lg text-xs font-bold">4 Tasks</span>
          </h3>
          <div className="space-y-4">
            {MOCK_ASSIGNMENTS.filter(a => a.status === 'pending').map((item) => (
              <div key={item.id} className="p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                  <span className="text-[10px] font-bold text-rose-500 uppercase">Due {item.deadline}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>{item.subject}</span>
                  <span>Weight: {item.weightage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Submission Status</h3>
          <div className="space-y-4">
            {MOCK_ASSIGNMENTS.filter(a => a.status === 'submitted').map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-700 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-400">{item.subject}</p>
                </div>
                <div className="flex items-center space-x-2 text-emerald-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs font-bold uppercase">Submitted</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCalculator = () => (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-in scale-95 duration-500">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">CGPA Predictor</h2>
      <p className="text-slate-500 mb-8">Calculate target grades for upcoming semesters to reach your desired CGPA.</p>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Current CGPA</label>
          <input type="number" defaultValue="8.18" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Semesters Completed</label>
          <input type="number" defaultValue="4" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Target CGPA (at Graduation)</label>
          <input type="number" defaultValue="8.5" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">Calculate Required Average</button>
        <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
          <p className="text-sm text-blue-600 font-medium mb-1 uppercase tracking-wider">Required SGPA Average</p>
          <p className="text-4xl font-black text-blue-800">8.82</p>
          <p className="text-xs text-blue-500 mt-2">To reach 8.5 CGPA in remaining 4 semesters.</p>
        </div>
      </div>
    </div>
  );

  const renderChecklist = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-500">
      {[
        { title: 'Daily Routine', color: 'blue', items: ['Check attendance', 'Review remarks', 'Check assignments', 'Mark topics covered'] },
        { title: 'Weekly Routine', color: 'indigo', items: ['Review full week topics', 'Analyze attendance', 'Plan study schedule', 'Prioritize assignments'] },
        { title: 'Monthly Routine', color: 'purple', items: ['Review CGPA trend', 'Analyze performance gap', 'Goal setting', 'Advisor check-in'] },
      ].map((list, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className={`text-${list.color}-600 font-bold mb-4 uppercase tracking-widest text-xs`}>{list.title}</h3>
          <div className="space-y-4">
            {list.items.map((item, i) => (
              <div key={i} className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-5 h-5 border-2 border-slate-200 rounded group-hover:border-blue-400 transition-colors"></div>
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'attendance': return renderAttendance();
      case 'performance': return renderPerformance();
      case 'assignments': return renderAssignments();
      case 'calculator': return renderCalculator();
      case 'checklist': return renderChecklist();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 ml-64 min-w-0">
        <DashboardHeader />
        <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <p className="text-sm text-slate-500 font-medium">Welcome back,</p>
              <h1 className="text-3xl font-bold text-slate-900">Student Overview</h1>
            </div>
            <div className="bg-white p-2 rounded-xl border border-slate-200 flex space-x-2 text-xs font-bold text-slate-500 shadow-sm">
              <span className="px-3 py-1.5 bg-slate-100 rounded-lg text-slate-700">Spring 2024</span>
              <span className="px-3 py-1.5 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">B.Tech 2nd Year</span>
            </div>
          </div>
          {renderContent()}
        </div>
      </main>
      <ChatBot />
    </div>
  );
};

export default App;
