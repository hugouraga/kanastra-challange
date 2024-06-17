import { render } from '@testing-library/react';
import { LoadingFullScreen } from '../../components/ui/loading-full-screen';
import { describe, it, expect } from 'vitest';

describe('LoadingFullScreen component - Unit Tests', () => {
  it('renders loading message correctly', () => {
    const {getByText} = render(<LoadingFullScreen />);
    const loadingElement = getByText('Carregando...');
    expect(loadingElement).toBeTruthy();
  });
});
