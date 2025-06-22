import React from 'react';

function RecoveryGauge({ score }) {
  // Placeholder for gauge (replace with chart.js or recharts later)
  return (
    <div className="h-32 flex items-center justify-center bg-gray-100 rounded">
      <span className="text-gray-500">[Recovery Gauge: {score}]</span>
    </div>
  );
}

export default RecoveryGauge; 