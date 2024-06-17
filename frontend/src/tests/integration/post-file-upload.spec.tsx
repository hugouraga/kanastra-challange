import { render, fireEvent, waitFor } from '@testing-library/react';
import { Home } from '@/pages/Home';
import * as mockUseFileContext from "@/contexts/file";
import { FileProvider } from '@/contexts/file';

vi.mock('@/contexts/error', () => {
  return {
    UseErrorContext: () => ({
      stateError: {
        isError: false,
      },
      dispatchError: vi.fn(),
    }),
    ErrorActionType: {
      CLEAR_ERROR: 'CLEAR_ERROR',
    },
  };
});

const useFileSpy = vi.spyOn(mockUseFileContext, "UseFileContext");

const mockContextValue = {
  state: {
    isLoading: false,
    isSuccessUploadNewFile: false,
    isErrorUploadNewFile: false,
    fileUpload: null,
    errorLoadingFile: '',
    filePreview: null,
    charge: null,
    file: null,
    fileList: [],
    chargeList: [],
  },
  dispatch: vi.fn(), 
};

useFileSpy.mockReturnValue(mockContextValue);

describe('Home Component', () => {
  test('handle file upload', async () => {  
    function getById<T extends Element>(container: HTMLElement, id: string): T {
      const element = container.querySelector<T>(`#${id}`);
      assert(element !== null, `Unable to find an element with ID #${id}.`)
      return element;
    }

    const { getByText, container } = render(
      <FileProvider>
        <Home />
      </FileProvider>
    );

    const uploadButton = getByText('Realizar lançamento');
    const myInputElement = getById<HTMLInputElement>(container, 'file');
    console.log(myInputElement)
    fireEvent.change(myInputElement, {
      target: {
        files: [new File(['conteúdo do arquivo'], 'arquivo.csv', { type: 'text/csv' })],
      },
    });

    
    fireEvent.click(uploadButton);
    expect(mockContextValue.dispatch).toHaveBeenCalledWith({
      type: 'CLEAR_FILE',
    });

    useFileSpy.mockRestore();
  });
});

