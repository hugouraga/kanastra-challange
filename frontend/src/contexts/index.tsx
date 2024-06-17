import React, { ReactNode } from 'react';
import { FileProvider } from '@/contexts/file'
import { ErrorProvider } from './error';

const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <FileProvider>
      <ErrorProvider>
          {children}
      </ErrorProvider>
    </FileProvider>
  );
};

export default AppProvider;
