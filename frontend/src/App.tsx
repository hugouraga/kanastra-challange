import React from 'react';
import * as Components from  '@/components';
import { AppRoute } from './routes';

const App: React.FC = () => {
  return (
    <div className="pt-10 p-5">
      <div className="md:max-w-7xl mx-auto min-h-screen mb-10">
        <Components.Header>
          <Components.NavMain>
            <Components.NavItem path="/" text="Início" />
            <Components.NavItem path="/historico" text="Histórico" />
          </Components.NavMain>
        </Components.Header>

        <AppRoute />
      </div>
    </div>
  );
};

export  { App } ;
