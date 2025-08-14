import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { CentroComandoCelulas } from '@/components/celulas/CentroComandoCelulas';

const CelulasPage = () => {
  return (
    <AppLayout>
      <CentroComandoCelulas />
    </AppLayout>
  );
};

export default CelulasPage;