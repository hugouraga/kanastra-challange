import { render, screen } from '@testing-library/react';
import { SuccessUploadNewFile } from '../../components/ui/success-upload-new-file';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/contexts/file', async () => {
  return {
    FileActionType: {
      CLEAR_RESPONSE_UPLOADING: 'CLEAR_RESPONSE_UPLOADING',
    },
    UseFileContext: () => ({
      dispatch: vi.fn(),
    }),
  };
});

describe('SuccessUploadNewFile component - Unit test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders success message and link correctly', () => {
    render(
      <MemoryRouter>
        <SuccessUploadNewFile />
      </MemoryRouter>
    );

    const successMessage = screen.getByText('Lançamento realizado com sucesso!');
    expect(successMessage).toBeTruthy();
    const linkElement = screen.getByRole('link', { name: /Ver lançamentos/i });
    expect(linkElement).toBeTruthy();
    expect(linkElement.getAttribute('href')).toBe('/historico');
  });
});
