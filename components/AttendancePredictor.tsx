
import React, { useState } from 'react';

interface AttendancePredictorProps {
  currentAttended: number;
  currentTotal: number;
}

const AttendancePredictor: React.FC<AttendancePredictorProps> = ({ currentAttended, currentTotal }) => {
  const [missCount, setMissCount] = useState(0);
  
  const predictedPercentage = Math.round((currentAttended / (currentTotal + missCount)) * 100);
  
  const getStatusColor = (percent: number) => {
    if (percent >= 75) return 'text-emerald-600';
    if (percent >= 70) return 'text-amber-600';
    return 'text-rose-600';
  };

  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
      <h4 className="text-sm font-semibold text-slate-700 mb-3">Attendance Predictor</h4>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-slate-500 block mb-1">If I miss next $x$ classes:</label>
          <input 
            type="range" 
            min="0" max="10" 
            value={missCount} 
            onChange={(e) => setMissCount(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Predicted %</p>
            <p className={`text-2xl font-bold ${getStatusColor(predictedPercentage)}`}>{predictedPercentage}%</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Safe Zone?</p>
            <p className={`text-sm font-semibold ${predictedPercentage >= 75 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {predictedPercentage >= 75 ? 'YES' : 'NO'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePredictor;
