import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '@/pages/Home';
import {Historic } from '@/pages/Historic';
import { Details } from '@/pages/Details';

const AppRoute: React.FC = () => {
  return (
    <main className="p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historico" element={<Historic />} />
        <Route path="/historico/detalhes" element={<Details />} />
      </Routes>
    </main>
  );
};

export { AppRoute };
