import React from 'react';

function DashboardCard({ title, children }) {
  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}

export default DashboardCard; 