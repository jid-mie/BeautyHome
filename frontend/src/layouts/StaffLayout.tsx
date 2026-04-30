import React from 'react';
import { Outlet } from 'react-router-dom';
import StaffSidebar from '../features/staff/components/StaffSidebar';

const StaffLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <StaffSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StaffLayout;
