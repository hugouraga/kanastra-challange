import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorUploadNewFile } from '../../components/ui/error-upload-new-file';
import * as mockUseFileContext from "@/contexts/file";
import * as mockUseErrorContext from "@/contexts/error";
import { vi } from 'vitest';

vi.mock('@/contexts/error', () => ({
  UseErrorContext: vi.fn(),
  ErrorActionType: {
    CLEAR_ERROR: 'CLEAR_ERROR',
  },
}));
vi.mock('@/contexts/file', () => ({
  UseFileContext: vi.fn(),
  FileActionType: {
    CLEAR_FILE: 'CLEAR_FILE',
  },
}));
vi.mock('./motion-animation', () => ({
  MotionAnimation: ({ children }: any) => <div>{children}</div>,
}));
vi.mock('@/imagens/error_right.svg', () => ({ default: 'error_right.svg' }));
vi.mock('@/imagens/error_left.svg', () => ({ default: 'error_left.svg' }));

const useFileSpy = vi.spyOn(mockUseFileContext, "UseFileContext");
const useErrorSpy = vi.spyOn(mockUseErrorContext, "UseErrorContext");

describe('ErrorUploadNewFile component - Unit Tests', () => {
  const mockDispatchError = vi.fn();
  const mockDispatch = vi.fn();

  beforeEach(() => {

    beforeEach(() => {
      vi.clearAllMocks();
    });
    
    useErrorSpy.mockReturnValue({
      dispatchError: mockDispatchError,
      stateError: {
        errorMessage: {
          title: 'Error Title',
          message: 'Error Message',
        },
        isError: false
      },
    });
    useFileSpy.mockReturnValue({
      dispatch: mockDispatch,
      state: {
        isLoading: false,
        isSuccessUploadNewFile: false,
        isErrorUploadNewFile: false,
        errorLoadingFile: '',
        filePreview: null,
        file: null,
        fileList: [],
        fileUpload: null,
        chargeList: [],
        charge: null
      }
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getAllByAltText } = render(
      <ErrorUploadNewFile />
    );
    expect(getByText('Error Title')).toBeTruthy();
    expect(getByText('Error Message')).toBeTruthy();
    expect(getAllByAltText('Erro lançamento')).toHaveLength(2);
  });

  it('dispatches clear error and file actions on button click', () => {
    const { getByRole } = render(
      <ErrorUploadNewFile />
    );
    const button = getByRole('button');
    fireEvent.click(button);
    expect(mockDispatchError).toHaveBeenCalledWith({ type: 'CLEAR_ERROR' });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR_FILE' });
  });
});
