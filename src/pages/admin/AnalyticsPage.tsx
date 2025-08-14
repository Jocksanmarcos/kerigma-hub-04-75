import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardAnalytics } from '@/components/dashboard/DashboardAnalytics';

const AnalyticsPage = () => {
  return (
    <AppLayout>
      <DashboardAnalytics />
    </AppLayout>
  );
};

export default AnalyticsPage;