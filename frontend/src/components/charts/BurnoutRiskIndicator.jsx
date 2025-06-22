import React from 'react';

function BurnoutRiskIndicator({ score }) {
  // Placeholder for indicator (replace with chart.js or recharts later)
  let color = 'bg-green-400';
  if (score >= 70) color = 'bg-red-500';
  else if (score >= 40) color = 'bg-yellow-400';

  return (
    <div className={`rounded-full w-20 h-20 flex items-center justify-center text-white text-xl font-bold ${color}`}>
      {score}
    </div>
  );
}

export default BurnoutRiskIndicator; 